import {OfferPreviewType} from './offers-preview';
import {UserType} from './user';

export type OfferType = OfferPreviewType & {
  bedrooms: number;
  description: string;
  goods: string[];
  host: UserType;
  images: string[];
  maxAdults: number;
}
