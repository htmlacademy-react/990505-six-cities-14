import {createReducer} from '@reduxjs/toolkit';
import {reviews} from '../mocks/review';
import {
  setSelectedCity,
  loadOffers,
  fetchReviews,
  fetchFavorites,
  requireAuthorizationStatus,
  fetchSortedOffers,
  setSortingParameter, setOffersDataLoadingStatus,
} from './action';
import {initialStateType} from '../types/initial-state';
import {AuthorizationStatus, DEFAULT_CITY, SortingParameters} from '../const';
import {OfferPreviewType} from '../types/offers-preview';

const initialState: initialStateType = {
  offers: [],
  isOffersDataLoading: true,
  selectedCity: DEFAULT_CITY,
  sortingParameter: SortingParameters.Default,
  sortedOffers: [],
  currentOffer: null,
  nearPlaces: [],
  favoriteOffers: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setSelectedCity, (state, action) => {
      state.selectedCity = action.payload;
      state.sortingParameter = SortingParameters.Default;
      state.sortedOffers = state.offers.filter((item) => item.city.name === action.payload);
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.sortedOffers = action.payload.filter((item) => item.city.name === state.selectedCity);
    })
    .addCase(fetchSortedOffers, (state, action) => {
      state.sortedOffers = action.payload;
    })
    .addCase(setSortingParameter, (state, action) => {
      state.sortingParameter = action.payload;
    })
    .addCase(fetchFavorites, (state) => {
      state.favoriteOffers = state.offers.filter((item: OfferPreviewType) => item.isFavorite);
    })
    .addCase(fetchReviews, (state) => {
      state.reviews = reviews;
    });
});

export {reducer};

