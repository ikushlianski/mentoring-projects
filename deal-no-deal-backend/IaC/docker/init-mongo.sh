#!/bin/bash

set -e

#mongo <<EOF1
#
#var config = {
#    "_id": "dbrs",
#    "version": 1,
#    "members": [
#        {
#            "_id": 0,
#            "host": "mongo:27017",
#            "priority": 1
#        }
#    ]
#};
#
#rs.initiate(config);
#
#rs.status();
#
#EOF1

echo "Preparing database..."

#sleep 3

mongo <<EOF2

use admin

db.createUser(
    {
        user: "ilya",
        pwd: "pass",
        roles: [ { role: "dbOwner", db: "admin"} ],
        passwordDigestor: "server",
    }
)

db.createCollection('user')

db.user.insert(
  {
    username: "$TF_VAR_COGNITO_DEFAULT_USER_NAME",
    role: 'somethingg',
    customprop: 'something-test'
  }
);

EOF2

