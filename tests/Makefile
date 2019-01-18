.DEFAULT_GOAL := help
PROJECT=ImageServer-tests

.PHONY: help
help:  ## Prints help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort
	
.PHONY: up
up:	## Start project with docker compose
	docker-compose up --build

