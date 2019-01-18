.DEFAULT_GOAL := help
PROJECT=ImageServer

PUBLISH = dotnet publish /p:TrimUnusedDependencies=false $(PROJECT)
DEBUG_FLAGS = -c Debug

RUNTIMES = win10-x64 win81-x64 win8-x64 win7-x64 osx.10.11-x64 ubuntu.16.04-x64 ubuntu.18.04-x64 debian.8-x64

DOCKER_REPO_VERSION = $(shell cat ../VERSION)
DOCKER_REPO_NAME 	= guneysu/dotnetcore-imageserver
DOCKER_REPO 		= $(DOCKER_REPO_NAME):$(DOCKER_REPO_VERSION)

ECS_REPO_NAME		= 023038164406.dkr.ecr.us-east-1.amazonaws.com/dotnetcore-imageserver
ECS_REPO 			= $(ECS_REPO_NAME):$(DOCKER_REPO_VERSION)

.PHONY: help
help:  ## Prints help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort
	
.PHONY: publish
publish: $(RUNTIMES) ## Publish project

$(RUNTIMES):
	$(PUBLISH) $(DEBUG_FLAGS) --runtime $@

.PHONY: publish
up:	## Start project with docker compose
	docker-compose up --build



.PHONY: docker-build
docker-build: ## Builds docker container
	docker build -t $(DOCKER_REPO) .
	docker tag $(DOCKER_REPO) $(ECS_REPO)


.PHONY: dockerhub-push
dockerhub-push: docker-build ## Pushs docker container to docker hub
	docker push $(DOCKER_REPO)

.PHONY: ecs-push
ecs-push: docker-build ## Pushs docker container to ECS Repository
	docker push $(ECS_REPO)
