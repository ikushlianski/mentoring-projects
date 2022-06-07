#!/bin/bash

unset DOCKER_ENV

# source all env variables
yarn loadenv
. .env.exported

docker rmi deal-no-deal-backend_webapp || echo "Already removed webapp"

# Pull each service without starting containers
docker-compose pull mongo
docker-compose pull mongo-express
docker-compose pull webapp

# Init containers
docker-compose up -d

printf "\nContainers initializing..."

# Give initialization some time
sleep 5

docker exec mongo-container /scripts/init-mongo.sh
