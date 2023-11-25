import {AuthorizationStatus} from '../const';
import {OfferPreviewType} from './offers-preview';
import {CurrentUserType} from './current-user';

export type initialStateType = {
  selectedCityName: string;
  offers: OfferPreviewType[];
  isOffersDataLoading: boolean;
  favoriteOffers: OfferPreviewType[];
  authorizationStatus: AuthorizationStatus;
  currentUserInfo: CurrentUserType | null;
};

