import {NameSpace} from '../../const';
import {StateType} from '../../types/state';
import {AuthorizationStatus} from '../../const';

export const selectAuthorizationStatus = (state: StateType) => state[NameSpace.User].authorizationStatus;
export const isUserAuthorized = (state: StateType) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;

export const selectCurrentUserInfo = (state: StateType) => state[NameSpace.User].currentUserInfo;
