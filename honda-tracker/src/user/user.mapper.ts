type Username = string;
type Password = string;

export interface IUserFromDB {
  pk: Username;
  sk: Username;
  password: Password;
}

export interface IUserDomain {
  username: Username;
  password: Password;
}

export const userMapper = (userFromDB: IUserFromDB): IUserDomain => {
  return {
    username: userFromDB.pk,
    password: userFromDB.password,
  };
};
