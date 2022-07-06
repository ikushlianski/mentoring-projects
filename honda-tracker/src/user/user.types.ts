import { DynamoDBRecord } from "../db/db.types";

export type Username = string;
export type Password = string;
export type SessionId = string;

export interface IUserFromDB extends DynamoDBRecord {
  pk: Username;
  sk: Username;
  password: Password;
  sessionId: SessionId;
}

export interface IUserDomain {
  username: Username;
  password: Password;
  sessionId: SessionId;
}
