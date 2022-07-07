import { marshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBRecord } from "../db/db.types";
import { Username } from "../user/user.types";

type BookingId = string;
type BookingStartTime = number;
type BookingEndTime = number;
type BookingDate = Date;
type BookingOwner = Username;
type BookingNotes = {
  carParkLocationText: string;
  carParkLongitude: string;
  carParkLatitude: string;
};

export interface IBookingFromDB extends DynamoDBRecord {
  pk: BookingId;
  sk: BookingDate;
  bookingStartTime: BookingStartTime;
  bookingEndTime: BookingEndTime;
  bookingOwner: BookingOwner;
  carParkLocationText: string;
  carParkLongitude: string;
  carParkLatitude: string;
}

export interface IBookingDomain {
  bookingId: BookingId;
  bookingStartTime: BookingStartTime;
  bookingEndTime: BookingEndTime;
  bookingDate: BookingDate;
  bookingOwner: BookingOwner;
  bookingNotes: BookingNotes;
}

export const bookingMapperToDomain = (
  bookingFromDB: IBookingFromDB
): IBookingDomain => {
  return {
    bookingId: bookingFromDB.pk,
    bookingDate: new Date(bookingFromDB.sk),
    bookingStartTime: bookingFromDB.bookingStartTime,
    bookingEndTime: bookingFromDB.bookingEndTime,
    bookingOwner: bookingFromDB.bookingOwner,
    bookingNotes: {
      carParkLocationText: bookingFromDB.carParkLocationText,
      carParkLongitude: bookingFromDB.carParkLongitude,
      carParkLatitude: bookingFromDB.carParkLatitude,
    },
  };
};

export const bookingMapperToDAL = (bookingDomain: IBookingDomain) => {
  const bookingForDAL: IBookingFromDB = {
    pk: bookingDomain.bookingId,
    sk: bookingDomain.bookingDate,
    bookingStartTime: bookingDomain.bookingStartTime,
    bookingEndTime: bookingDomain.bookingEndTime,
    bookingOwner: bookingDomain.bookingOwner,
    carParkLocationText: bookingDomain.bookingNotes.carParkLocationText,
    carParkLongitude: bookingDomain.bookingNotes.carParkLongitude,
    carParkLatitude: bookingDomain.bookingNotes.carParkLatitude,
  };

  return marshall(bookingForDAL);
};
