const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(10 * 1000);

const { Given } = require('@cucumber/cucumber');
const {
  PutItemCommand,
  UpdateItemCommand,
} = require('@aws-sdk/client-dynamodb');
const { correctCreds, TableName, client } = require('../test-data');

Given('the user is already registered', async function () {
  const input = {
    TableName,
    Item: {
      pk: { S: `user#${correctCreds.username}` },
      sk: { S: `user#${correctCreds.username}` },
      password: {
        S: Buffer.from(correctCreds.password).toString('base64'),
      },
      toRemove: {
        S: 'ddd',
      },
    },
  };

  await client.send(new PutItemCommand(input));
});

Given('the user did not log in previously', async function () {
  const input = {
    TableName,
    Key: {
      pk: { S: `user#${correctCreds.username}` },
      sk: { S: `user#${correctCreds.username}` },
    },
    UpdateExpression: `REMOVE sessionId`,
  };

  await client.send(new UpdateItemCommand(input));
});

Given('the user logged in before', async function () {
  const input = {
    TableName,
    Key: {
      pk: { S: `user#${correctCreds.username}` },
      sk: { S: `user#${correctCreds.username}` },
    },
    UpdateExpression: `SET sessionId = :sid`,
    ExpressionAttributeValues: {
      ':sid': { S: correctCreds.sessionId },
    },
  };

  await client.send(new UpdateItemCommand(input));

  this.sessionCookie = `sessionId=${correctCreds.sessionId}`;
});
