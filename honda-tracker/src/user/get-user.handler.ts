import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import { AWS_REGION } from '../constants';
import { TABLE_NAME } from '../db/db.constants';

// todo remove all this
const client = new DynamoDBClient({ region: AWS_REGION });

exports.handler = async function (event: APIGatewayEvent) {
  if (!event.pathParameters) {
    return {
      statusCode: 400,
      body: 'No user found in request',
    };
  }

  const tableName = `${TABLE_NAME}_${process.env.stage}`;

  const user = event.pathParameters.id;

  const input = {
    TableName: tableName,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: marshall({
      ':pk': `user#${user}`,
    }),
  };

  const command = new QueryCommand(input);

  try {
    const { Items } = await client.send(command);

    console.log('Items', Items);

    if (Items?.[0]) {
      const user = JSON.stringify(unmarshall(Items[0]));

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: user,
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify([]),
    };
  } catch (error) {
    console.error('Error in getBooking Lambda', error);

    return {
      statusCode: 500,
      body: `Error retrieving user`,
    };
  }
};
