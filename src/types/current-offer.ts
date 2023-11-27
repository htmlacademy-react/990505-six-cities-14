import {OfferPreviewType} from './offers-preview';
import {ReviewType} from './review';
import {OfferType} from './offers';

export type CurrentOfferType = {
  offer: OfferType;
  nearPlaces: OfferPreviewType[];
  reviews: ReviewType[];
};
