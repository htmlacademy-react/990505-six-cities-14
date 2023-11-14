import {createAction} from '@reduxjs/toolkit';
import {ReviewType} from '../types/review';
import {AuthorizationStatus, SortingParameters} from '../const';
import {OfferPreviewType} from '../types/offers-preview';

export const fetchOffers = createAction<OfferPreviewType[]>('offers/fetchOffers');

export const setSelectedCity = createAction<string>('offers/setSelectedCity');

export const setSortingParameter = createAction<SortingParameters>('offers/setSortingParameter');

export const fetchSortedOffers = createAction<OfferPreviewType[]>('offers/fetchSortedOffers');

export const fetchReviews = createAction<ReviewType[]>('review/fetchReviews');

export const fetchFavorites = createAction<OfferPreviewType[]>('offers/fetchFavorites');

export const fetchAuthorizationStatus = createAction<AuthorizationStatus>('user/fetchAuthorizationStatus');

