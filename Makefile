compose := docker compose
scripts_dir := ./scripts

.PHONY: help
help:
	@cat $(scripts_dir)/help.txt

.PHONY: setup_compose
setup_compose:
	$(scripts_dir)/setup_compose.sh

.PHONY: build
build: setup_compose
	$(compose) build

.PHONY: setup_web
setup_web: build
	$(scripts_dir)/setup_web.sh

.PHONY: up
up: setup_web
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

