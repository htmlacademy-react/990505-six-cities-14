import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';
import {OfferPreviewType} from '../types/offers-preview';


export const setOffers = createAction<OfferPreviewType[]>('offers/setOffers');
export const loadFavorites = createAction<OfferPreviewType[]>('offers/loadFavorites');
export const setFavoriteStatus = createAction<{ offerId: string; status: boolean }>('offers/setFavoriteStatus');

export const setSelectedCityName = createAction<string>('offers/setSelectedCityName');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
