import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {UserProcess} from '../../types/initial-state';
import {CurrentUserType} from '../../types/current-user';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUserInfo: null,
};

function setAuthInfo(state: UserProcess, currentUserInfo: CurrentUserType | null = null): void {
  state.authorizationStatus = currentUserInfo === null ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth;
  state.currentUserInfo = currentUserInfo;
}

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        setAuthInfo(state, action.payload);
      })
      .addCase(checkAuthAction.rejected, (state) => {
        setAuthInfo(state);
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        setAuthInfo(state, action.payload);
      })
      .addCase(loginAction.rejected, (state) => {
        setAuthInfo(state);
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        setAuthInfo(state);
      });
  }
});
