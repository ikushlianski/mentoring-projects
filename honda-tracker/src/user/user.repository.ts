import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { AWS_REGION, TABLE_NAME } from '../constants';
import { userMapToDAL, userMapToDomain } from './user.mapper';
import { IUserDomain } from './user.types';

const client = new DynamoDBClient({ region: AWS_REGION });
const TableName = `${TABLE_NAME}_${process.env.stage}`;

export class UserRepository {
  getOneByCredentials = async (
    domainUser: IUserDomain,
  ): Promise<IUserDomain | null> => {
    const { pk, sk, password } = userMapToDAL(domainUser);

    const input: QueryCommandInput = {
      TableName,
      KeyConditionExpression: 'pk = :pk and sk = :sk',
      ExpressionAttributeValues: {
        ':pk': {
          S: pk,
        },
        ':sk': {
          S: sk,
        },
        ':password': { S: password },
      },
      FilterExpression: 'password = :password',
    };

    console.log({ input });

    try {
      const { Items } = await client.send(new QueryCommand(input));

      console.log({ Items });

      const userFromDB = Items?.[0];

      return userFromDB ? userMapToDomain(userFromDB) : null;
    } catch (e) {
      console.error('getOneByCredentials query failed', e);

      return null;
    }
  };

  updateSessionId = async (_user: IUserDomain): Promise<void> => {
    const userForDbLayer = userMapToDAL(_user);

    if (!userForDbLayer.sessionId) {
      throw new Error('User does not have sessionId');
    }

    const input: UpdateItemCommandInput = {
      TableName,
      Key: {
        pk: { S: userForDbLayer.pk },
        sk: { S: userForDbLayer.pk },
      },
      UpdateExpression: `SET sessionId = :sid`,
      ExpressionAttributeValues: {
        ':sid': { S: userForDbLayer.sessionId },
      },
    };

    await client.send(new UpdateItemCommand(input));
  };
}

export const userRepository = new UserRepository();
