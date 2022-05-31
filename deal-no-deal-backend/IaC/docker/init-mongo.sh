#!/bin/bash

set -e

mongo <<EOF

use $MONGO_INITDB_DATABASE

db.createCollection('user')

db.user.insert({
  username: "$TF_VAR_COGNITO_DEFAULT_USER_NAME",
  role: 'admin',
  customprop: 'something-test'
});

EOF
