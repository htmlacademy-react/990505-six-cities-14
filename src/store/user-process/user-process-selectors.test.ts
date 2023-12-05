import {AuthorizationStatus, NameSpace} from '../../const';
import {describe, expect} from 'vitest';
import {UserProcess} from '../../types/initial-state';
import {isUserAuthorized, selectAuthorizationStatus, selectCurrentUserInfo} from './selectors';
import {makeFakeStore, makeFakeUserInfo} from '../../utils/mocks';

describe('UserProcess selectors', () => {
  it('should return authorization status from state', ()=> {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state: UserProcess = {
      authorizationStatus,
      currentUserInfo: null
    };
    const result = selectAuthorizationStatus(makeFakeStore({[NameSpace.User]: state}));
    expect(result).toBe(authorizationStatus);
  });

  it('should return "true" because auth status is "Auth"', () => {
    const currentUserInfo = makeFakeUserInfo();
    const state: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      currentUserInfo: currentUserInfo
    };

    const result = selectCurrentUserInfo(makeFakeStore({[NameSpace.User]: state}));
    expect(result).toEqual(currentUserInfo);
  });

  it('should return isUserAuthorized "true" because auth status is "Auth"', ()=> {
    const state: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      currentUserInfo: null
    };
    const result = isUserAuthorized(makeFakeStore({[NameSpace.User]: state}));
    expect(result).toBe(true);
  });
});
