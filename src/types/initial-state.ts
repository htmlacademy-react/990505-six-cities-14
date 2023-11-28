import {AuthorizationStatus} from '../const';
import {OfferPreviewType} from './offers-preview';
import {CurrentUserType} from './current-user';

export type OffersData = {
  selectedCityName: string;
  offers: OfferPreviewType[];
  isOffersDataLoading: boolean;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  currentUserInfo: CurrentUserType | null;
};

