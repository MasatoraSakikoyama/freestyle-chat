.PHONY: stop
stop:
	docker ps -a | xargs docker stop
.PHONY: run
run:
	cd .docker; docker-compose up;
