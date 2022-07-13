const { After } = require('@cucumber/cucumber');
const {
  TableName,
  correctCreds,
  wrongUsernameCreds,
  wrongPasswordCreds,
  client,
} = require('./test-data');
const { BatchWriteItemCommand } = require('@aws-sdk/client-dynamodb');

After(async () => {
  console.log('I am the AFTER hook');

  const itemsToDelete = {
    RequestItems: {
      [TableName]: [
        {
          DeleteRequest: {
            Key: {
              pk: { S: `user#${correctCreds.username}` },
              sk: { S: `user#${correctCreds.username}` },
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              pk: { S: `user#${wrongUsernameCreds.username}` },
              sk: { S: `user#${wrongUsernameCreds.username}` },
            },
          },
        },
        {
          DeleteRequest: {
            Key: {
              pk: { S: `user#${wrongPasswordCreds.username}` },
              sk: { S: `user#${wrongPasswordCreds.username}` },
            },
          },
        },
      ],
    },
  };

  await client.send(new BatchWriteItemCommand(itemsToDelete));
});
