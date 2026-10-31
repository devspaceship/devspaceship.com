compose := "docker compose"
scripts_dir := "./scripts"

# General
help:
    @cat {{ scripts_dir }}/help.txt

# Native
dev:
    @{{ scripts_dir }}/setup_native.sh
    cd web && pnpm run dev

# Docker Compose
up:
    @{{ scripts_dir }}/setup_compose.sh
    {{ compose }} up -d

down:
    {{ compose }} down

logs:
    {{ compose }} logs -f

shell:
    {{ compose }} run --rm web bash

# Rust
rust-dev:
    @{{ scripts_dir }}/rust-dev.sh

rust-build:
    @{{ scripts_dir }}/rust-build.sh

# Testing
test:
    cd web && pnpm run test

test-coverage:
    cd web && pnpm run test:coverage

test-ui:
    cd web && pnpm run test:ui

test-watch:
    cd web && pnpm run test:watch

# Biome
check:
    cd web && pnpm run check
