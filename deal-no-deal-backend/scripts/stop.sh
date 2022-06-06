#!/bin/bash

# source all env variables
yarn loadenv

. .env.exported

# for dev purposes
docker-compose down --remove-orphans

docker container prune -f

docker volume rm $(docker volume ls -q)

