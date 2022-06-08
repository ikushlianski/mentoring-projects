#!/bin/bash

yarn prisma generate --schema ./src/db/prisma/schema.prisma
nest start --watch
