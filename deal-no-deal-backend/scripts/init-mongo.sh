#!/bin/bash

set -e

mongo <<INIT_REPLICA_SET

var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 0,
            "host": "mongo-container:27017",
            "priority": 1
        }
    ]
};

rs.initiate(config);

rs.status();

INIT_REPLICA_SET

echo "Preparing database..."

sleep 5

mongo <<DATA

use $MONGO_INITDB_DATABASE

db.createCollection('User')

db.User.createIndex(
  {
      "username": 1
  },
  {
      unique: true,
  }
)

db.User.insert(
  {
    username: "$TF_VAR_COGNITO_DEFAULT_USER_NAME",
    role: 'somethingg',
    customprop: 'something-test'
  }
);

DATA

