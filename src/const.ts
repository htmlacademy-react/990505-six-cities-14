export enum AppRouter {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const SortLocations = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

