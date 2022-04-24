#!/bin/bash

# source all env variables
. .env

cd ./IaC/docker || exit

docker-compose up
