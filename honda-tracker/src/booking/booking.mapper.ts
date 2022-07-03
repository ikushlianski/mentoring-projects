type BookingId = string;
type BookingStartTime = number;
type BookingEndTime = number;
type BookingDate = Date;
type BookingOwner = string;
type BookingNotes = {
  carParkLocationText: string;
  carParkLongitude: string;
  carParkLatitude: string;
};

export interface IBookingFromDB {
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

export const bookingMapper = (
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
