import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, NEAR_PLACES_LENGTH} from '../const';
import {AppDispatchType, StateType} from '../types/state';
import {OfferPreviewType} from '../types/offers-preview';
import {AuthDataType} from '../types/auth-data';
import {dropToken, getToken, saveToken} from '../services/token';
import {CurrentUserType} from '../types/current-user';
import {OfferType} from '../types/offers';
import {ReviewType} from '../types/review';
import {ReviewDataType} from '../types/review-data';
import {createAPI} from '../services/api';

type AsyncThunkConfigType = {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}
export const fetchOffersAction = createAsyncThunk<OfferPreviewType[], undefined, AsyncThunkConfigType>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreviewType[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<OfferPreviewType[], undefined, AsyncThunkConfigType>(
  'offers/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreviewType[]>(APIRoute.Favorite);
    return data;
  }
);

export const postOfferFavoriteStatus = async function (offerId: string, status: boolean) {
  const api = createAPI();
  const response = await api.post<OfferType>(`${APIRoute.Favorite}/${offerId}/${Number(status)}`);

  return response.data;
};

export const postOfferReview = async function (offerId: string, review: ReviewDataType) {
  const api = createAPI();
  const response = await api.post<ReviewType>(`${APIRoute.Reviews}/${offerId}`, review);

  return response.data;
};

export const checkAuthAction = createAsyncThunk<CurrentUserType|null, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    if (getToken()) {
      const {data} = await api.get<CurrentUserType>(APIRoute.Login);
      return data;
    }
    return null;
  },
);
export const loginAction = createAsyncThunk<CurrentUserType, AuthDataType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<CurrentUserType>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  }
);
export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const fetchOfferById = async function (offerId: string) {
  const api = createAPI();
  const offerResponse = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
  if (offerResponse.status) {
    const nearPlacesResponse = await api.get<OfferType[]>(`${APIRoute.Offers}/${offerId}${APIRoute.NearPlace}`);
    const reviewsResponse = await api.get<ReviewType[]>(`${APIRoute.Reviews}/${offerId}`);
    return {
      offer: offerResponse.data,
      nearPlaces: nearPlacesResponse.data.slice(0, NEAR_PLACES_LENGTH),
      reviews: reviewsResponse.data,
    };
  }

  return null;
};

