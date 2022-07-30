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

    // todo remove bookings
  ]);
})();
