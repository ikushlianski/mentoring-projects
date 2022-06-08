#!/bin/bash

unset DOCKER_ENV

# source all env variables
yarn loadenv
. .env.exported

# Init containers
docker-compose up -d --build

printf "\nContainers initializing..."

# Give initialization some time
sleep 5

docker exec mongo-container /scripts/init-mongo.sh
