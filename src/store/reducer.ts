import {createReducer} from '@reduxjs/toolkit';
import {
  setSelectedCity,
  loadOffers,
  requireAuthorizationStatus,
  fetchSortedOffers,
  setSortingParameter,
  setOffersDataLoadingStatus,
  loadCurrentOffer,
  loadReviews,
  loadNearPlace,
  addReview,
  loadFavorites,
  setCurrentUserInfo,
  dropCurrentOffer,
} from './action';
import {initialStateType} from '../types/initial-state';
import {AuthorizationStatus, DEFAULT_CITY, NEAR_PLACES_LENGTH, SortingParameters} from '../const';

const initialState: initialStateType = {
  offers: [],
  isOffersDataLoading: true,
  selectedCity: DEFAULT_CITY,
  sortingParameter: SortingParameters.Default,
  sortedOffers: [],
  currentOffer: null,
  nearPlaces:[],
  reviews: [],
  favoriteOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUserInfo: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setCurrentUserInfo, (state, action) => {
      state.currentUserInfo = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.sortedOffers = action.payload.filter((item) => item.city.name === state.selectedCity);
    })
    .addCase(dropCurrentOffer, (state) => {
      state.currentOffer = null;
      state.nearPlaces = [];
      state.reviews = [];
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(loadNearPlace, (state, action) => {
      state.nearPlaces = action.payload.slice(0, NEAR_PLACES_LENGTH);
    })
    .addCase(setSelectedCity, (state, action) => {
      state.selectedCity = action.payload;
      state.sortingParameter = SortingParameters.Default;
      state.sortedOffers = state.offers.filter((item) => item.city.name === action.payload);
    })
    .addCase(fetchSortedOffers, (state, action) => {
      state.sortedOffers = action.payload;
    })
    .addCase(setSortingParameter, (state, action) => {
      state.sortingParameter = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favoriteOffers = action.payload;
    });
});

//TODO обновлять offers и favoritesOffers
export {reducer};

