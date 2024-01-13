# Launch the project
.PHONY: up
up: setup_web
	docker compose up -d

.PHONY: setup_web
setup_web: build
	./scripts/setup_web.sh

.PHONY: build
build: setup_compose
	docker compose build

.PHONY: setup_compose
setup_compose:
	./scripts/setup_compose.sh

.PHONY: down
down:
	docker compose down

.PHONY: logs
logs:
	docker compose logs -f

.PHONY: shell
shell:
	docker compose run web bash