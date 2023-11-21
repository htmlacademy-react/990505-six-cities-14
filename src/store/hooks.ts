import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {AppDispatchType, StateType} from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;

export const selectOfferDataLoadingStatus = (state: StateType) => state.isOffersDataLoading;
export const selectCity = (state: StateType) => state.selectedCity;
export const selectOffers = (state: StateType) => state.offers;
export const selectCurrentOffer = (state: StateType) => state.currentOffer;
export const selectNearPlaces = (state: StateType) => state.nearPlaces;
export const selectReviews = (state: StateType) => state.reviews;

export const selectSortedOffers = (state: StateType) => state.sortedOffers;
export const selectSortingParameter = (state: StateType) => state.sortingParameter;
export const selectFavoriteOffers = (state: StateType) => state.favoriteOffers;
export const selectAuthorizationStatus = (state: StateType) => state.authorizationStatus;
export const selectCurrentUserInfo = (state: StateType) => state.currentUserInfo;
