import {UserType} from './user';

export type CurrentUserType = UserType & {
  email: string;
  token: string;
};
