#!/bin/bash

# todo move this file and all other scripts into ./scripts

yarn prisma generate
nest start --watch
