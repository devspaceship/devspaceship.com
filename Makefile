compose := docker compose
scripts_dir := ./scripts

# Launch the project in detached mode
.PHONY: up
up: setup_web
	$(compose) up -d

# Prepare the web container for development
.PHONY: setup_web
setup_web: build
	$(scripts_dir)/setup_web.sh

# Build the project using docker compose
.PHONY: build
build: setup_compose
	$(compose) build

# Run initial setup scripts for docker compose
.PHONY: setup_compose
setup_compose:
	$(scripts_dir)/setup_compose.sh

# Take down the containers
.PHONY: down
down:
	$(compose) down

# Follow logs
.PHONY: logs
logs:
	$(compose) logs -f

# Open a bash shell in the web container
.PHONY: shell
shell:
	$(compose) run --rm web bash

# Print help
.PHONY: help
help:
	cat $(scripts_dir)/help.txt
