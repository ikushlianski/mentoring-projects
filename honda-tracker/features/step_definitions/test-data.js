const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

module.exports = {
  client: new DynamoDBClient({ region: 'eu-west-1' }),
  correctCreds: {
    username: 'correct-username',
    password: 'correct-password',
    sessionId: 'valid-session-id',
  },
  wrongUsernameCreds: {
    username: 'incorrect-username',
    password: 'correct-password',
  },
  wrongPasswordCreds: {
    username: 'correct-username1',
    password: 'incorrect-password',
  },
  loginUrl:
    'https://xdcj0eimlj.execute-api.eu-west-1.amazonaws.com/qa/login',
  TableName: 'honda_tracker_qa',
};
