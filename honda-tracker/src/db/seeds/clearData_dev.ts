import { FAMILY_HONDA_CAR_NUMBER } from '../../car/car.constants';
import { HondaTrackerDynamoService } from '../db.service';

(async () => {
  await Promise.all([
    // remove users
    HondaTrackerDynamoService.entities.user
      .delete({ username: 'papa' })
      .go(),
    HondaTrackerDynamoService.entities.user
      .delete({ username: 'ilya' })
      .go(),

    // remove cars
    HondaTrackerDynamoService.entities.car
      .delete({ carId: FAMILY_HONDA_CAR_NUMBER })
      .go(),

    // remove settings
    HondaTrackerDynamoService.entities.setting
      .delete({ username: 'ilya' })
      .go(),

    HondaTrackerDynamoService.entities.setting
      .delete({ username: 'papa' })
      .go(),

    // todo remove bookings
  ]);
})();
