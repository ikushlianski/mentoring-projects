#!/bin/bash

yarn loadenv

. .env.exported

cd ./IaC/docker || exit

docker-compose up
