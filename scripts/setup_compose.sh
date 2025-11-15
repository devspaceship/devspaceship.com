#!/usr/bin/env bash

set -e

echo "Setting up docker compose environment..."

if [ ! -f compose.override.yaml ]; then
  echo "Creating compose.override.yaml..."
  cp compose.override.example.yaml compose.override.yaml
fi

echo "Building containers..."
docker compose build

if [ ! -d web/node_modules ]; then
  echo "Installing dependencies in container..."
  docker compose run --rm web pnpm install
fi

echo "Docker compose setup complete!"
