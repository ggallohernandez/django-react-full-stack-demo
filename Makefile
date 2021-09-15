# define root project dir
ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
-include ${ROOT_DIR}/.env

certs:
	@echo "Run 'brew install mkcert nss' on macOS"
	@mkcert -install
	@mkcert -cert-file .docker/nginx.dev/site.crt -key-file .docker/nginx.dev/site.key localhost 127.0.0.1

build:
	@docker-compose build
	@docker-compose run --rm api bash -c "[ -e "db.sqlite3" ] || (./manage.py migrate && ./manage.py createsuperuser)"

shell:
	@docker-compose run --rm api bash

up:
	@docker-compose up -d --remove-orphans

down:
	@docker-compose down

restart: down up

ask:
	@echo "Are you sure? [y/N]" && read ans && [ $${ans:-N} = y ]

clean: ask down
	@rm -rf ./db.sqlite3
	@make build up

fe.shell:
	@docker-compose run --rm -w /app/resources/react-app frontend bash

fe.install:
	@docker-compose run --rm -w /app/resources/react-app frontend yarn install

fe.build:
	@docker-compose run --rm -w /app/resources/react-app frontend yarn build

fe.build_dev:
	@docker-compose run --rm -w /app/resources/react-app frontend yarn build:dev