.DEFAULT_GOAL := help

PROJECT=ImageServer
RUNTIMES = win10-x64 win81-x64 win8-x64 win7-x64 osx.10.11-x64 ubuntu.16.04-x64
	
.PHONY: help
help:  ## Prints help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort
	
.PHONY: publish
publish: $(RUNTIMES) ## Publish project

$(RUNTIMES):
	dotnet publish $(PROJECT) -c Debug --runtime $@
