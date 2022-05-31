#!/bin/bash

set -e

mongo <<EOF1

var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo1:27017",
            "priority": 1
        },
        {
            "_id": 2,
            "host": "mongo2:27017",
            "priority": 1
        },
        {
            "_id": 3,
            "host": "mongo3:27017",
            "priority": 3
        }
    ]
};

rs.initiate(config);

rs.status();

EOF1

echo "Preparing database..."

sleep 15

mongo <<EOF2

use $MONGO_INITDB_DATABASE

db.createCollection('user')

db.user.insert(
  {
    username: "$TF_VAR_COGNITO_DEFAULT_USER_NAME",
    role: 'admin',
    customprop: 'something-test'
  },
  { writeConcern: { w: "majority", wtimeout: 5000 } }
);

EOF2

