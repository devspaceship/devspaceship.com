compose := docker compose
scripts_dir := ./scripts

.PHONY: help
help:
	@cat $(scripts_dir)/help.txt

# Native
.PHONY: dev
dev:
	@$(scripts_dir)/setup_native.sh
	cd web && pnpm run dev

# Docker Compose
.PHONY: up
up:
	@$(scripts_dir)/setup_compose.sh
	$(compose) up -d

.PHONY: down
down:
	$(compose) down

.PHONY: logs
logs:
	$(compose) logs -f

.PHONY: shell
shell:
	$(compose) run --rm web bash

# Testing
.PHONY: test
test:
	cd web && pnpm run test

.PHONY: test-coverage
test-coverage:
	cd web && pnpm run test:coverage

.PHONY: test-ui
test-ui:
	cd web && pnpm run test:ui

.PHONY: test-watch
test-watch:
	cd web && pnpm run test:watch

