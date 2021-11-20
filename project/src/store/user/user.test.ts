import { AuthorizationStatus } from '../../const';
import { makeFakeAuthUser } from '../../mocks/user';
import { AuthUser } from '../../types/auth-data';
import {
  authorizationRequest,
  checkAuthRequest,
  loadUser,
  requireAuthorization,
  requireLogout
} from '../actions';
import { user } from './user';

const state = {
  user: {} as AuthUser,
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuthLoading: false,
  isCheckAuthLoading: false,
};

const fakeUser = makeFakeAuthUser();

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(user(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should set user by a fakeUser', () => {
    expect(user(state, loadUser(fakeUser))).toEqual({
      ...state,
      user: fakeUser,
    });
  });

  it('should update authorizationStatus to "AUTH"', () => {
    expect(user(state, requireAuthorization(AuthorizationStatus.Auth))).toEqual(
      {
        ...state,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    );
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    expect(
      user(state, requireAuthorization(AuthorizationStatus.NoAuth)),
    ).toEqual({
      ...state,
      authorizationStatus: AuthorizationStatus.NoAuth,
    });
  });

  it('should set authorizationStatus to "NO_AUTH"', () => {
    expect(user(state, requireLogout())).toEqual({
      ...state,
      authorizationStatus: AuthorizationStatus.NoAuth,
    });
  });

  it('should update isAuthLoading to true', () => {
    expect(user(state, authorizationRequest(true))).toEqual({
      ...state,
      isAuthLoading: true,
    });
  });

  it('should update isCheckAuthLoading to true', () => {
    expect(user(state, checkAuthRequest(true))).toEqual({
      ...state,
      isCheckAuthLoading: true,
    });
  });
});
