#!/bin/bash

# source all env variables
yarn loadenv
. .env.exported

# Pull each service without starting containers
docker-compose pull mongo
docker-compose pull webapp
docker-compose pull mongo-express

# Init containers
docker-compose up -d

printf "\nContainers initializing..."

# Give initialization some time
sleep 5

docker exec mongo-container /scripts/init-mongo.sh
