import { DynamoDBRecord } from '../db/db.types';
import { Username } from '../user/user.types';

export type BookingId = string;
export type BookingStartTime = number;
export type BookingEndTime = number;
export type BookingDate = Date;
export type BookingOwner = Username;
export type BookingNotes = {
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
