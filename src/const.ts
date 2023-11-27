export const BACKEND_URL = 'https://14.design.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Reviews = '/comments',
  NearPlace = '/nearby',
  Login = '/login',
  Logout = '/logout',
}

export const Locations = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const DEFAULT_CITY = Locations[0];

export const NEAR_PLACES_LENGTH = 3;

export const MAX_IMAGES_LENGTH = 6;

export const MAX_REVIEWS_LENGTH = 10;

export enum SortingParameters {
  Default = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  Top = 'Top rated first'
}

export const MAX_COMMENT_LENGTH = 300;

export const MIN_COMMENT_LENGTH = 50;

export const ratingMap = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
