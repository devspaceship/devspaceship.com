#!/usr/bin/env bash

set -e

echo "Setting up Rust environment..."

# Keep native builds hermetic: globally exported compiler env vars (Homebrew,
# openjdk, Nix) leak into every C dependency build and break vendored ones.
unset CPPFLAGS CFLAGS CXXFLAGS LDFLAGS LIBRARY_PATH CPATH

if [[ "$(uname)" == "Darwin" ]]; then
  # A Nix/Homebrew GNU gcc earlier in PATH cannot compile crates that include
  # macOS framework headers (e.g. aws-lc-sys); force Apple clang instead.
  export CC=/usr/bin/clang
  export CXX=/usr/bin/clang++
fi

if ! command -v rustup &> /dev/null; then
  echo "Error: rustup is not installed (https://rustup.rs)"
  exit 1
fi

if ! rustup target list --installed | grep -q '^wasm32-unknown-unknown$'; then
  echo "Adding wasm32-unknown-unknown target..."
  rustup target add wasm32-unknown-unknown
fi

if ! command -v cargo-leptos &> /dev/null; then
  # Prefer a prebuilt binary via cargo-binstall; building cargo-leptos from
  # source compiles ~500 crates including heavy C dependencies.
  if ! command -v cargo-binstall &> /dev/null && command -v brew &> /dev/null; then
    echo "Installing cargo-binstall..."
    brew install cargo-binstall
  fi
  if command -v cargo-binstall &> /dev/null; then
    echo "Installing cargo-leptos (prebuilt binary)..."
    cargo binstall -y cargo-leptos
  else
    echo "Installing cargo-leptos from source (this can take a while)..."
    cargo install cargo-leptos --locked
  fi
fi

# The CLI must match the wasm-bindgen crate version used by the workspace.
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
wasm_bindgen_version="$(awk '
  $0 == "name = \"wasm-bindgen\"" { found = 1; next }
  found && /^version = / { gsub(/"/, "", $3); print $3; exit }
' "$script_dir/../rust/Cargo.lock")"

if [[ -z "$wasm_bindgen_version" ]]; then
	echo "Error: could not determine wasm-bindgen version from rust/Cargo.lock"
	exit 1
fi

if ! command -v wasm-bindgen &>/dev/null ||
	[[ "$(wasm-bindgen --version)" != "wasm-bindgen $wasm_bindgen_version" ]]; then
	echo "Installing wasm-bindgen-cli $wasm_bindgen_version..."
	if command -v cargo-binstall &>/dev/null; then
		cargo binstall -y wasm-bindgen-cli --version "$wasm_bindgen_version" --force
	else
		cargo install wasm-bindgen-cli --version "$wasm_bindgen_version" --locked --force
	fi
fi

# The stylesheet uses Tailwind v4 directives; older CLIs cannot compile it.
if ! command -v tailwindcss &>/dev/null ||
	[[ "$(tailwindcss --help 2>&1)" != *"tailwindcss v4."* ]]; then
	if ! command -v brew &>/dev/null; then
		echo "Error: Tailwind CSS v4 is required. Install the standalone tailwindcss CLI and add it to PATH (https://tailwindcss.com/blog/standalone-cli)."
		exit 1
	fi
	echo "Installing Tailwind CSS v4..."
	brew install tailwindcss
	if ! command -v tailwindcss &>/dev/null ||
		[[ "$(tailwindcss --help 2>&1)" != *"tailwindcss v4."* ]]; then
		echo "Error: Tailwind CSS v4 is still unavailable. Ensure Homebrew's tailwindcss is first on PATH."
		exit 1
	fi
fi

echo "Rust setup complete!"
