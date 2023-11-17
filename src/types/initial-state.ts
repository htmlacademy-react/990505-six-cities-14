import {AuthorizationStatus, SortingParameters} from '../const';
import {OfferPreviewType} from './offers-preview';
import {ReviewType} from './review';
import {OfferType} from './offers';

export type initialStateType = {
  selectedCity: string;
  offers: OfferPreviewType[];
  isOffersDataLoading: boolean;
  sortingParameter: SortingParameters;
  sortedOffers: OfferPreviewType[];
  currentOffer: OfferType | null;
  nearPlaces: OfferPreviewType[];
  favoriteOffers: OfferPreviewType[];
  reviews: ReviewType[];
  authorizationStatus: AuthorizationStatus;
};

