import {createReducer} from '@reduxjs/toolkit';
import {loadFavorites, setFavoriteStatus, setOffers, setSelectedCityName,} from './action';
import {initialStateType} from '../types/initial-state';
import {AuthorizationStatus, DEFAULT_CITY} from '../const';
import {checkAuthAction, fetchFavoriteOffersAction, fetchOffersAction, loginAction, logoutAction} from './api-actions';

const initialState: initialStateType = {
  offers: [],
  favoriteOffers: [],
  isOffersDataLoading: true,
  selectedCityName: DEFAULT_CITY,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUserInfo: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authorizationStatus = action.payload === null ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth;
      state.currentUserInfo = action.payload;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.currentUserInfo = null;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.currentUserInfo = action.payload;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.currentUserInfo = null;
    })
    .addCase(logoutAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.Unknown;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.currentUserInfo = null;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.offers = [];
      state.isOffersDataLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersDataLoading = false;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.offers = [];
      state.isOffersDataLoading = false;
    })
    .addCase(fetchFavoriteOffersAction.pending, (state) => {
      state.offers = [];
      state.isOffersDataLoading = true;
    })
    .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersDataLoading = false;
    })
    .addCase(fetchFavoriteOffersAction.rejected, (state) => {
      state.offers = [];
      state.isOffersDataLoading = false;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setFavoriteStatus, (state, action) => {
      state.offers.map((item) => {
        if (item.id === action.payload.offerId) {
          item.isFavorite = action.payload.status;
        }
      });
    })
    .addCase(setSelectedCityName, (state, action) => {
      state.selectedCityName = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favoriteOffers = action.payload;
    });
});

export {reducer};

