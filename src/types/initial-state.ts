import {AuthorizationStatus, SortingParameters} from '../const';
import {OfferPreviewType} from './offers-preview';
import {ReviewType} from './review';
import {OfferType} from './offers';
import {CurrentUserType} from './current-user';

export type initialStateType = {
  selectedCity: string;
  offers: OfferPreviewType[];
  isOffersDataLoading: boolean;
  sortingParameter: SortingParameters;
  sortedOffers: OfferPreviewType[];
  currentOffer: OfferType | null;
  nearPlaces: OfferPreviewType[];
  reviews: ReviewType[];
  favoriteOffers: OfferPreviewType[];
  authorizationStatus: AuthorizationStatus;
  currentUserInfo: CurrentUserType | null;
};

