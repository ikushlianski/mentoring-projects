import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { RawDbItem } from "../db/db.types";
import { IUserDomain, IUserFromDB } from "./user.types";

export const userMapperToDomain = (rawDbItem: RawDbItem): IUserDomain => {
  const userFromDB = unmarshall(rawDbItem) as IUserFromDB;

  return {
    username: userFromDB.pk,
    password: userFromDB.password,
    sessionId: userFromDB.sessionId,
  };
};

export const userMapperToDAL = (userDomain: IUserDomain) => {
  return marshall({
    pk: userDomain.username,
    sk: userDomain.username,
    password: userDomain.password,
    sessionId: userDomain.sessionId,
  });
};
