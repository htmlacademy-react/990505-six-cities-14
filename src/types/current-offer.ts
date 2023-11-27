import {ReviewType} from './review';
import {OfferType} from './offers';

export type CurrentOfferType = {
  offer: OfferType;
  nearPlaces: OfferType[];
  reviews: ReviewType[];
};
