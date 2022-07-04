import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBRecord, RawDbItem } from "../db/db.types";

export type Username = string;
export type Password = string;

export interface IUserFromDB extends DynamoDBRecord {
  pk: Username;
  sk: Username;
  password: Password;
}

export interface IUserDomain {
  username: Username;
  password: Password;
}

export const userMapperToDomain = (rawDbItem: RawDbItem): IUserDomain => {
  const userFromDB = unmarshall(rawDbItem) as IUserFromDB;

  return {
    username: userFromDB.pk,
    password: userFromDB.password,
  };
};

export const userMapperToDAL = (userDomain: IUserDomain) => {
  return marshall({
    pk: userDomain.username,
    sk: userDomain.username,
    password: userDomain.password,
  });
};
