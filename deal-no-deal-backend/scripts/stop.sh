#!/bin/bash

# source all env variables
yarn loadenv

. .env.exported

cd ./IaC/docker || exit

# for dev purposes
docker-compose down

docker container prune -f

docker volume rm $(docker volume ls -q)
#docker volume rm MONGO_DATA1 MONGO_DATA2 MONGO_DATA3

