import { HondaTrackerDynamoService } from '../db.service';
import { FAMILY_HONDA_CAR_NUMBER } from '../../car/car.constants';
import { UserRoles } from '../../user/user.constants';

(async () => {
  // cars
  const insertCarHonda = HondaTrackerDynamoService.entities.car
    .create({
      carId: FAMILY_HONDA_CAR_NUMBER,
      username: 'owner#papa',
    })
    .go();

  // users
  const insertUserIlya = HondaTrackerDynamoService.entities.user
    .create({
      username: 'ilya',
      password: process.env.ILYA_PASSWORD as string,
      roles: [UserRoles.DRIVER],
      availableCarIds: [FAMILY_HONDA_CAR_NUMBER],
    })
    .go();

  const insertUserPapa = HondaTrackerDynamoService.entities.user
    .create({
      username: 'papa',
      password: process.env.PAPA_PASSWORD as string,
      roles: [UserRoles.CAR_PROVIDER, UserRoles.DRIVER],
      availableCarIds: [FAMILY_HONDA_CAR_NUMBER],
    })
    .go();

  const insertIlyaSettings = HondaTrackerDynamoService.entities.setting
    .create({
      username: 'papa',
      rideCompletionText: 'Машина в гараже',
      notifications: {
        notifyWhenBookingChanged: false,
        notifyWhenBookingCreated: false,
      },
    })
    .go();

  const insertPapaSettings = HondaTrackerDynamoService.entities.setting
    .create({
      username: 'ilya',
      rideCompletionText: 'Машина в гараже',
      notifications: {
        notifyWhenBookingChanged: true,
        notifyWhenBookingCreated: true,
      },
    })
    .go();

  await Promise.all([
    insertCarHonda,
    insertUserPapa,
    insertUserIlya,
    insertIlyaSettings,
    insertPapaSettings,
  ]);

  console.log('done');
})();
