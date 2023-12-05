import {AuthorizationStatus} from '../../const';
import {userProcess} from './user-process';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {fakeUserLogin, makeFakeUserInfo} from '../../utils/mocks';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus:  AuthorizationStatus.Auth,
      currentUserInfo: null
    };

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus:  AuthorizationStatus.Unknown,
      currentUserInfo: null
    };
    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus:  AuthorizationStatus.Unknown,
      currentUserInfo: null
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      currentUserInfo: makeFakeUserInfo()
    };
    const result = userProcess.reducer(initialState, checkAuthAction.fulfilled(expectedState.currentUserInfo, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = {
      authorizationStatus:  AuthorizationStatus.Auth,
      currentUserInfo: makeFakeUserInfo(),
    };
    const expectedState = {
      authorizationStatus:  AuthorizationStatus.NoAuth,
      currentUserInfo: null
    };

    const result = userProcess.reducer(initialState, checkAuthAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus:  AuthorizationStatus.NoAuth,
      currentUserInfo: null
    };
    const expectedState = {
      authorizationStatus:  AuthorizationStatus.Auth,
      currentUserInfo: makeFakeUserInfo()
    };

    const result = userProcess.reducer(initialState, loginAction.fulfilled(expectedState.currentUserInfo, '', fakeUserLogin));
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      currentUserInfo: makeFakeUserInfo()
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      currentUserInfo: null
    };

    const result = userProcess.reducer(initialState, loginAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      currentUserInfo: makeFakeUserInfo()
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      currentUserInfo: null
    };

    const result = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});

