import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {reviews} from '../mocks/review';
import {
  setSelectedCity,
  fetchOffers,
  fetchReviews,
  fetchFavorites,
  fetchAuthorizationStatus,
} from './action';
import {initialStateType} from '../types/initial-state';
import {AuthorizationStatus, DEFAULT_CITY} from '../const';
import {OfferPreviewType} from '../types/offers-preview';

const initialState: initialStateType = {
  selectedCity: DEFAULT_CITY,
  offers: offers,
  sortedOffers: offers.filter((item) => item.city.name === DEFAULT_CITY),
  currentOffer: null,
  nearPlaces: [],
  favoriteOffers: offers,
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSelectedCity, (state, action) => {
      state.selectedCity = action.payload;
      state.sortedOffers = state.offers.filter((item) => item.city.name === action.payload);
    })
    .addCase(fetchOffers, (state) => {
      state.offers = offers;
    })
    .addCase(fetchFavorites, (state) => {
      state.favoriteOffers = offers.filter((item: OfferPreviewType) => item.isFavorite);
    })
    .addCase(fetchReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(fetchAuthorizationStatus, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export {reducer};

