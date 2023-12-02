import {image, name, internet, lorem, datatype, address, helpers, commerce, date} from 'faker';
import {CurrentUserType} from '../types/current-user.js';
import {AuthorizationStatus, DEFAULT_CITY, Locations} from '../const.js';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { StateType } from '../types/state';
import {OfferPreviewType} from '../types/offers-preview';
import {CityType} from '../types/city';
import {LocationType} from '../types/location';
import {OfferType} from '../types/offers';
import {UserType} from '../types/user';
import {AuthDataType} from '../types/auth-data';
import {ReviewType} from '../types/review';

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

export const makeFakeUser = (): UserType => ({
  name: name.findName(),
  avatarUrl: image.imageUrl(),
  isPro: datatype.boolean(),
});


export const makeFakeCurrentOffer = (): OfferType => ({
  ...makeFakeOffer(),
  bedrooms: datatype.number({ min: 1, max:50 }),
  description: lorem.words(),
  goods: ['wi-fi', 'kitchen'],
  host: makeFakeUser(),
  images: new Array(6).fill(null).map(() => (
    image.city()
  )),
  maxAdults: datatype.number({ min: 1, max:15 }),
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

export const makeFakeReview = (): ReviewType => ({
  comment: lorem.paragraph(),
  date: new Date(date.recent()).toLocaleString(),
  id: datatype.number({ min: 1, max: 1000 }),
  rating: datatype.number({ min: 1, max:5 }),
  user: makeFakeUser(),
});


