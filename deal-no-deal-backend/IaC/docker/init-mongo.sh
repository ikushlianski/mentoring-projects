#!/bin/bash

set -e

mongo <<EOF

use $MONGO_INITDB_DATABASE

db.createCollection('users')

db.users.insert({
  username: "$TF_VAR_COGNITO_DEFAULT_USER_NAME",
  role: 'admin',
  customprop: 'something-test'
});

EOF
