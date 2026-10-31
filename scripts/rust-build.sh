#!/usr/bin/env bash
set -e

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$script_dir/setup_rust.sh"

cd "$script_dir/../rust/site"
exec cargo leptos build --release
