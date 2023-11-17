import {createAction} from '@reduxjs/toolkit';
import {ReviewType} from '../types/review';
import {AuthorizationStatus, SortingParameters} from '../const';
import {OfferPreviewType} from '../types/offers-preview';

//export const loadOffers = createAction<OfferPreviewType[]>('data/loadOffers');

export const loadOffers = createAction<OfferPreviewType[]>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('offers/setOffersDataLoadingStatus');

export const setSelectedCity = createAction<string>('offers/setSelectedCity');

export const setSortingParameter = createAction<SortingParameters>('offers/setSortingParameter');

export const fetchSortedOffers = createAction<OfferPreviewType[]>('offers/fetchSortedOffers');

export const fetchReviews = createAction<ReviewType[]>('review/fetchReviews');

export const fetchFavorites = createAction<OfferPreviewType[]>('offers/fetchFavorites');

export const requireAuthorizationStatus = createAction<AuthorizationStatus>('user/requireAuthorizationStatus');

