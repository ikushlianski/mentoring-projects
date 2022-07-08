import { unmarshall } from '@aws-sdk/util-dynamodb';
import { RawDbItem } from '../db/db.types';
import { IUserDomain, IUserFromDB } from './user.types';

export const userMapToDomain = (rawDbItem: RawDbItem): IUserDomain => {
  const userFromDB = unmarshall(rawDbItem) as IUserFromDB;

  return {
    username: userFromDB.pk.split('user#')[1],
    password: userFromDB.password,
    sessionId: userFromDB.sessionId,
  };
};

export const userMapToDAL = (userDomain: IUserDomain) => {
  const passwordInDbFormat = Buffer.from(userDomain.password).toString(
    'base64',
  );

  console.log({ passwordInDbFormat });

  return {
    pk: `user#${userDomain.username}`,
    sk: `user#${userDomain.username}`,
    password: passwordInDbFormat,
    sessionId: userDomain.sessionId,
  };
};
