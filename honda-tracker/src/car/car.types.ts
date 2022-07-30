import { Username } from '../user/user.types';

export type CarId = string;

export interface ICar {
  carId: CarId;
  username: Username;
}
