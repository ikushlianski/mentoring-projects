// import { Entities } from '../constants';
// import { Username } from '../user/user.types';
//
// export interface ISettingsDomain {
//   type: Entities.Settings;
//   username: Username;
//   getNotifiedWhenBookingCreated: boolean;
//   getNotifiedWhenBookingChanged: boolean;
//   rideCompletionText: string;
// }
//
// export interface ISettingsDB {
//   username: Username;
//   notifications: {
//     getNotifiedWhenBookingCreated: boolean;
//     getNotifiedWhenBookingChanged: boolean;
//   };
//   rideCompletionText: string;
// }
//
// export const settingsDbToDomain = (
//   settingsFromDB: ISettingsDB,
// ): ISettingsDomain => {
//   return {
//     type: Entities.Settings,
//
//   };
// };
//
// export const settingsDomainToDb = (settingsDomain: ISettingsDomain) => {
//   const settingsForDb: ISettingsDB = {
//     username: settingsDomain.username,
//     notifications: {
//       getNotifiedWhenBookingCreated:
//         settingsDomain.getNotifiedWhenBookingCreated,
//       getNotifiedWhenBookingChanged:
//         settingsDomain.getNotifiedWhenBookingChanged,
//     },
//     rideCompletionText: settingsDomain.rideCompletionText,
//   };
//
//   return settingsForDb;
// };
