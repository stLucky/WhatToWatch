import { checkAuthAction, loginAction, logoutAction } from './api-actions';
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  ERROR_401,
  NO_CONTENT_RESPONSE_CODE,
  SUCCESS_RESPONSE_CODE
} from '../../const';
import {
  authorizationRequest,
  checkAuthRequest,
  loadUser,
  redirectToRoute,
  requireAuthorization,
  requireLogout
} from '../actions';
import { makeFakeAuthData, makeFakeAuthUser } from '../../mocks/user';
import { makeMockStore } from '../../mocks/store';
import { mockAPI } from '../../mocks/api';

const user = makeFakeAuthUser();
const authData = makeFakeAuthData();

describe('User async actions', () => {
  it('should authorization status is «auth» when server return 200', async () => {
    const store = makeMockStore();
    mockAPI.onGet(APIRoute.Login).reply(SUCCESS_RESPONSE_CODE, user);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      checkAuthRequest(true),
      loadUser(user),
      requireAuthorization(AuthorizationStatus.Auth),
      checkAuthRequest(false),
    ]);
  });

  it('should dispatch only checkAuthRequest when server return error', async () => {
    const store = makeMockStore();
    mockAPI.onGet(APIRoute.Login).reply(ERROR_401, user);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      checkAuthRequest(true),
      checkAuthRequest(false),
    ]);
  });

  it('should dispatch AuthorizationRequest, LoadUser, RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const store = makeMockStore();
    Storage.prototype.setItem = jest.fn();

    mockAPI
      .onPost(APIRoute.Login)
      .reply(SUCCESS_RESPONSE_CODE, { token: 'secret', ...user });

    await store.dispatch(loginAction(authData));

    expect(store.getActions()).toEqual([
      authorizationRequest(true),
      loadUser(user),
      requireAuthorization(AuthorizationStatus.Auth),
      redirectToRoute(AppRoute.Root),
      authorizationRequest(false),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('user-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI.onDelete(APIRoute.Logout).reply(NO_CONTENT_RESPONSE_CODE);

    const store = makeMockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([requireLogout()]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('user-token');
  });
});
