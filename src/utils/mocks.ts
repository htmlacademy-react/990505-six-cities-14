import {image, name, internet, lorem, datatype, address, helpers, commerce} from 'faker';
import {CurrentUserType} from '../types/current-user.js';
import {AuthorizationStatus, DEFAULT_CITY, Locations} from '../const.js';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { StateType } from '../types/state';
import {OfferPreviewType} from '../types/offers-preview';
import {CityType} from '../types/city';
import {LocationType} from '../types/location';
import {AuthDataType} from '../types/auth-data';

export type AppThunkDispatch = ThunkDispatch<StateType, ReturnType<typeof createAPI>, Action>;

export const fakeUserLogin: AuthDataType = { email : 'test@test.ru', password: '123456' };

export const makeFakeUserInfo = (): CurrentUserType => ({
  name: name.findName(),
  avatarUrl: image.imageUrl(),
  isPro: false,
  email: internet.email(),
  token: lorem.word(),
});

export const makeFakeLocation = (): LocationType => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: 10,
});

export const makeFakeCity = (): CityType => ({
  location: makeFakeLocation(),
  name: helpers.randomize(Locations),
});

export const makeFakeOffer = (): OfferPreviewType => ({
  city: makeFakeCity(),
  id: lorem.word(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  previewImage: image.city(),
  price:  Number(commerce.price()),
  rating: datatype.number({ min: 1, max:5 }),
  title: lorem.words(),
  type: lorem.word(),
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<StateType>) => ({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth, currentUserInfo: null },
  OFFERS: {
    isOffersDataLoading: false,
    offers: [],
    selectedCityName: DEFAULT_CITY,
  },
  ...initialState ?? {},
});


