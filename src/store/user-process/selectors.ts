import {StateType} from '../../types/state';
import {AuthorizationStatus, NameSpace} from '../../const';
import { createSelector } from 'reselect';

export const selectAuthorizationStatus = (state: StateType) => state[NameSpace.User].authorizationStatus;
export const isUserAuthorized = createSelector([selectAuthorizationStatus], (authorizationStatus) => authorizationStatus === AuthorizationStatus.Auth);

export const selectCurrentUserInfo = (state: StateType) => state[NameSpace.User].currentUserInfo;
