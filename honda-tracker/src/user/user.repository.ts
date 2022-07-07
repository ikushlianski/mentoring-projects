import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { AWS_REGION, TABLE_NAME } from '../constants';
import { userMapperToDomain } from './user.mapper';
import { IUserDomain } from './user.types';

const client = new DynamoDBClient({ region: AWS_REGION });
const TableName = `${TABLE_NAME}_${process.env.stage}`;

export class UserRepository {
  getOneByCredentials = async ({
    username,
    password,
  }: IUserDomain): Promise<IUserDomain | null> => {
    const passwordInDbFormat = Buffer.from(password).toString('base64');

    console.log({ passwordInDbFormat });

    const input: QueryCommandInput = {
      TableName,
      KeyConditionExpression: 'pk = :pk and sk = :sk',
      ExpressionAttributeValues: {
        ':pk': {
          S: `user#${username}`,
        },
        ':sk': {
          S: `user#${username}`,
        },
        ':password': { S: passwordInDbFormat },
      },
      FilterExpression: 'password = :password',
    };

    console.log({ input });

    try {
      const { Items } = await client.send(new QueryCommand(input));

      console.log({ Items });

      const userFromDB = Items?.[0];

      return userFromDB ? userMapperToDomain(userFromDB) : null;
    } catch (e) {
      console.error('getOneByCredentials query failed', e);

      return null;
    }
  };

  updateSessionId = async (user: IUserDomain): Promise<void> => {
    if (!user.sessionId) {
      throw new Error('User does not have sessionId');
    }

    const input: UpdateItemCommandInput = {
      Key: {
        pk: {
          S: `user#${user.username}`,
        },
        sk: {
          S: `user#${user.username}`,
        },
      },
      TableName,
      UpdateExpression: `SET sessionId = :sid`,
      ExpressionAttributeValues: {
        ':sid': {
          S: user.sessionId,
        },
      },
    };

    await client.send(new UpdateItemCommand(input));
  };
}

export const userRepository = new UserRepository();
