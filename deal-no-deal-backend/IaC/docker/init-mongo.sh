#!/bin/bash

set -e

mongo <<EOF1

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

EOF1

echo "Preparing database..."

sleep 5

mongo <<EOF2

use $MONGO_INITDB_DATABASE

db.createUser(
    {
        user: "ilya",
        pwd: "pass",
        roles: [ { role: "dbOwner", db: "$MONGO_INITDB_DATABASE"} ],
        passwordDigestor: "server",
    }
)

db.createCollection('User')

db.User.insert(
  {
    username: "$TF_VAR_COGNITO_DEFAULT_USER_NAME",
    role: 'somethingg',
    customprop: 'something-test'
  }
);

EOF2

