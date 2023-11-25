import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatchType, StateType} from '../types/state';
import {AuthorizationStatus} from '../const';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;

export const selectOfferDataLoadingStatus = (state: StateType) => state.isOffersDataLoading;
export const selectCityName = (state: StateType) => state.selectedCityName;
export const selectOffers = (state: StateType) => state.offers;

export const selectAuthorizationStatus = (state: StateType) => state.authorizationStatus;
export const isUserAuthorized = (state: StateType) => state.authorizationStatus === AuthorizationStatus.Auth;

export const selectCurrentUserInfo = (state: StateType) => state.currentUserInfo;
