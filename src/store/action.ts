import {createAction} from '@reduxjs/toolkit';
import {ReviewType} from '../types/review';
import {AuthorizationStatus} from '../const';
import {OfferPreviewType} from '../types/offers-preview';

export const setSelectedCity = createAction<string>('setSelectedCity');

export const fetchOffers = createAction<OfferPreviewType[]>('offers/fetchOffers');

export const fetchReviews = createAction<ReviewType[]>('review/fetchReviews');

export const fetchFavorites = createAction<OfferPreviewType[]>('offers/fetchFavorites');

export const fetchAuthorizationStatus = createAction<AuthorizationStatus>('user/fetchAuthorizationStatus');

