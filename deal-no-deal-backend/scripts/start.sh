#!/bin/bash

# source all env variables
yarn loadenv

. .env.exported

cd ./IaC/docker || exit

docker-compose up -d

sleep 5

docker exec mongo3 /scripts/init-mongo.sh
