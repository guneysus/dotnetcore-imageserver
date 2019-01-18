.DEFAULT_GOAL := help

project=dotnetcore-imageserver-tests

.PHONY: help
help:  ## Print this message.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.PHONY: test 
test:  ## Test
	node_modules/.bin/mocha --timeout 25000 --colors --reporter mocha-jenkins-reporter

