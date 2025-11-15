#!/usr/bin/env bash

set -e

echo "Setting up native environment..."

cd web

if ! command -v pnpm &> /dev/null; then
  echo "Error: pnpm is not installed"
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  pnpm install
fi

echo "Native setup complete!"
