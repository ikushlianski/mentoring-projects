import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Entities } from "../constants";
import { DynamoDBRecord, RawDbItem } from "../db/db.types";
import { Username } from "../user/user.mapper";

export interface ISettingsFromDB extends DynamoDBRecord {
  pk: Entities.Settings;
  sk: Username;
  notifyWhenBookingCreated: boolean;
  notifyWhenBookingChanged: boolean;
  rideCompletionText: string;
}

export interface ISettingsDomain {
  type: Entities.Settings;
  userId: Username;
  notifyWhenBookingCreated: boolean;
  notifyWhenBookingChanged: boolean;
  rideCompletionText: string;
}

export const settingsToDomain = (rawDbItem: RawDbItem): ISettingsDomain => {
  const bookingFromDB = unmarshall(rawDbItem) as ISettingsFromDB;

  return {
    type: bookingFromDB.pk,
    userId: bookingFromDB.sk,
    notifyWhenBookingCreated: bookingFromDB.notifyWhenBookingChanged,
    notifyWhenBookingChanged: bookingFromDB.notifyWhenBookingChanged,
    rideCompletionText: bookingFromDB.rideCompletionText,
  };
};

export const settingsToDAL = (settingsDomain: ISettingsDomain) => {
  return marshall({
    pk: Entities.Settings,
    sk: settingsDomain.userId,
    notifyWhenBookingCreated: settingsDomain.notifyWhenBookingCreated,
    notifyWhenBookingChanged: settingsDomain.notifyWhenBookingChanged,
    rideCompletionText: settingsDomain.rideCompletionText,
  });
};
