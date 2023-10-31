import {UserType} from './user';

export type ReviewType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: UserType;
};
