import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {AppDispatchType, StateType} from '../types/state';
import {OfferPreviewType} from '../types/offers-preview';
import {
  addReview,
  loadCurrentOffer,
  loadNearPlace,
  loadOffers,
  loadReviews,
  requireAuthorizationStatus,
  setCurrentUserInfo,
  setOffersDataLoadingStatus,
  loadFavorites,
  redirectToRoute,
} from './action';
import {AuthDataType} from '../types/auth-data';
import {dropToken, saveToken} from '../services/token';
import {CurrentUserType} from '../types/current-user';
import {OfferType} from '../types/offers';
import {ReviewType} from '../types/review';
import {ReviewDataType} from '../types/review-data';

type AsyncThunkConfigType = {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}
export const fetchOffersAction = createAsyncThunk<void, undefined, AsyncThunkConfigType>(
  'offers/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<OfferPreviewType[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, AsyncThunkConfigType>(
  'offers/fetchFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferPreviewType[]>(APIRoute.Favorite);
    dispatch(loadFavorites(data));
  }
);
//TODO
export const postFavoriteAction = createAsyncThunk<void, {offerId: OfferType['id']; favoriteStatus: boolean}, AsyncThunkConfigType>(
  'offer/postReview',
  async ({offerId, favoriteStatus}, {extra: api}) => {
    await api.post<OfferType[]>(`${APIRoute.Favorite}/${offerId}/${Number(!favoriteStatus)}`);
  });

export const fetchOfferAction = createAsyncThunk<void, OfferType['id'], AsyncThunkConfigType>(
  'offer/fetchOffer',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
    dispatch(loadCurrentOffer(data));
  }
);

export const fetchNearPlaceAction = createAsyncThunk<void, OfferType['id'], AsyncThunkConfigType>(
  'offer/fetchNearPlace',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferPreviewType[]>(`${APIRoute.Offers}/${offerId}${APIRoute.NearPlace}`);
    dispatch(loadNearPlace(data));
  }
);

export const fetchReviewsAction = createAsyncThunk<void, OfferType['id'], AsyncThunkConfigType>(
  'offer/fetchReviews',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<ReviewType[]>(`${APIRoute.Reviews}/${offerId}`);
    dispatch(loadReviews(data));
  }
);

export const postReviewAction = createAsyncThunk<void, {offerId: OfferType['id']; reviewData: ReviewDataType}, AsyncThunkConfigType>(
  'offer/postReview',
  async ({offerId, reviewData}, {dispatch, extra: api}) => {
    const {data} = await api.post<ReviewType>(`${APIRoute.Reviews}/${offerId}`, reviewData);
    dispatch(addReview(data));
  });

export const fetchFavoritesAction = createAsyncThunk<void, OfferPreviewType[], AsyncThunkConfigType>(
  'offer/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferPreviewType[]>(APIRoute.Favorite);
    dispatch(loadFavorites(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<CurrentUserType>(APIRoute.Login);
      dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setCurrentUserInfo(data));
    } catch {
      dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);


export const loginAction = createAsyncThunk<void, AuthDataType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<CurrentUserType>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setCurrentUserInfo(data));
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setCurrentUserInfo(null));
  }
);
