#!/bin/bash

# source all env variables
yarn loadenv

. .env.exported

cd ./IaC/docker || exit

#docker-compose build

docker-compose up -d

printf "\nContainers initializing..."

sleep 5

docker exec mongo-container /scripts/init-mongo.sh
