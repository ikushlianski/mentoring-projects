#!/bin/bash

# source all env variables
yarn loadenv
. .env.exported

cd ./IaC/docker || exit

docker-compose up
