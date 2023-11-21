import {createAction} from '@reduxjs/toolkit';
import {ReviewType} from '../types/review';
import {AppRoute, AuthorizationStatus, SortingParameters} from '../const';
import {OfferPreviewType} from '../types/offers-preview';
import {CurrentUserType} from '../types/current-user';
import {OfferType} from '../types/offers';

export const requireAuthorizationStatus = createAction<AuthorizationStatus>('user/requireAuthorizationStatus');
export const setCurrentUserInfo = createAction<CurrentUserType | null>('user/setCurrentUserInfo');

export const loadOffers = createAction<OfferPreviewType[]>('data/loadOffers');
export const loadFavorites = createAction<OfferPreviewType[]>('offers/loadFavorites');
export const setOffersDataLoadingStatus = createAction<boolean>('offers/setOffersDataLoadingStatus');
export const setSortingParameter = createAction<SortingParameters>('offers/setSortingParameter');
export const fetchSortedOffers = createAction<OfferPreviewType[]>('offers/fetchSortedOffers');

export const loadCurrentOffer = createAction<OfferType>('offer/loadCurrentOffer');
export const dropCurrentOffer = createAction<void>('offer/dropCurrentOffer');
export const loadReviews = createAction<ReviewType[]>('offer/loadReviews');
export const addReview = createAction<ReviewType>('offer/addReview');
export const loadNearPlace = createAction<OfferPreviewType[]>('offer/loadNearPlace');

export const setSelectedCity = createAction<string>('offers/setSelectedCity');
export const fetchFavorites = createAction<OfferPreviewType[]>('offers/fetchFavorites');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
