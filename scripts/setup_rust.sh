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

if ! command -v rustup &>/dev/null; then
	echo "Error: rustup is not installed (https://rustup.rs)"
	exit 1
fi

if ! rustup target list --installed | grep -q '^wasm32-unknown-unknown$'; then
	echo "Adding wasm32-unknown-unknown target..."
	rustup target add wasm32-unknown-unknown
fi

if ! command -v cargo-leptos &>/dev/null; then
	# Prefer a prebuilt binary via cargo-binstall; building cargo-leptos from
	# source compiles ~500 crates including heavy C dependencies.
	if ! command -v cargo-binstall &>/dev/null && command -v brew &>/dev/null; then
		echo "Installing cargo-binstall..."
		brew install cargo-binstall
	fi
	if command -v cargo-binstall &>/dev/null; then
		echo "Installing cargo-leptos (prebuilt binary)..."
		cargo binstall -y cargo-leptos
	else
		echo "Installing cargo-leptos from source (this can take a while)..."
		cargo install cargo-leptos --locked
	fi
fi

if ! command -v wasm-opt &>/dev/null; then
	if command -v brew &>/dev/null; then
		echo "Installing binaryen (wasm-opt)..."
		brew install binaryen
	else
		echo "Error: wasm-opt is not installed. Please install binaryen."
		exit 1
	fi
fi

if [[ -f rust/site/package.json ]]; then
	if ! command -v pnpm &>/dev/null; then
		echo "Error: pnpm is not installed"
		exit 1
	fi

	if [[ ! -f rust/site/node_modules/tailwindcss/package.json ]]; then
		echo "Installing Rust site frontend dependencies..."
		if [[ -f rust/site/pnpm-lock.yaml ]]; then
			(cd rust/site && pnpm install --frozen-lockfile)
		else
			(cd rust/site && pnpm install)
		fi
	fi
fi

echo "Rust setup complete!"
