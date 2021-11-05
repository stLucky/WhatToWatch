import { ThunkActionResult } from '../types/actions';
import {
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  loadFilmsSuccess,
  loadFilmsRequest,
  loadFilmsError,
  authorizationRequest
} from './actions';
import { saveToken, dropToken, Token } from '../services/token';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { FilmsType } from '../types/films';
import { AuthData } from '../types/auth-data';
import camelcaseKeys from 'camelcase-keys';
import { toast } from 'react-toastify';

const AUTH_FAIL_MESSAGE = 'Oops... Something went wrong. Try again';

export const fetchFilmsAction = (): ThunkActionResult => async (
  dispatch,
  _,
  api,
) => {
  dispatch(loadFilmsRequest(true));

  try {
    const { data } = await api.get<FilmsType>(APIRoute.Films);
    const normalizedData = data.map((film) => camelcaseKeys(film));

    dispatch(loadFilmsSuccess(normalizedData));
  } catch (e) {
    dispatch(loadFilmsError());
  } finally {
    dispatch(loadFilmsRequest(false));
  }
};

export const checkAuthAction = (): ThunkActionResult => async (
  dispatch,
  _getState,
  api,
) => {
  await api.get(APIRoute.Login).then(() => {
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  });
};

export const loginAction = ({
  login: email,
  password,
}: AuthData): ThunkActionResult => async (dispatch, _getState, api) => {
  dispatch(authorizationRequest(true));

  try {
    const {
      data: { token },
    } = await api.post<{ token: Token }>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  } catch (e) {
    toast.error(AUTH_FAIL_MESSAGE);
  } finally {
    dispatch(authorizationRequest(false));
  }
};

export const logoutAction = (): ThunkActionResult => async (
  dispatch,
  _getState,
  api,
) => {
  api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireLogout());
};
