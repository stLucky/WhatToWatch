import { ThunkActionResult } from '../../types/actions';
import {
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  authorizationRequest,
  loadUser,
  checkAuthRequest
} from '../actions';
import { saveToken, dropToken } from '../../services/token';
import {
  APIRoute,
  AuthorizationStatus,
  AppRoute,
  TRY_AGAIN_ERROR,
  AUTH_INFO
} from '../../const';
import { AuthData } from '../../types/auth-data';
import camelcaseKeys from 'camelcase-keys';
import { toast } from 'react-toastify';

export const checkAuthAction = (): ThunkActionResult => async (
  dispatch,
  _,
  api,
) => {
  dispatch(checkAuthRequest(true));

  try {
    const { data } = await api.get(APIRoute.Login);
    const normalizedUser = camelcaseKeys(data);

    delete normalizedUser.token;

    dispatch(loadUser(normalizedUser));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch (e) {
    toast.info(AUTH_INFO, { position: 'bottom-right', theme: 'dark' });
  } finally {
    dispatch(checkAuthRequest(false));
  }
};

export const loginAction = ({
  login: email,
  password,
}: AuthData): ThunkActionResult => async (dispatch, _, api) => {
  dispatch(authorizationRequest(true));

  try {
    const {
      data: { token, ...rest },
    } = await api.post(APIRoute.Login, {
      email,
      password,
    });

    const normalizedUser = camelcaseKeys(rest);

    saveToken(token);
    dispatch(loadUser(normalizedUser));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  } catch (e) {
    toast.error(TRY_AGAIN_ERROR);
  } finally {
    dispatch(authorizationRequest(false));
  }
};

export const logoutAction = (): ThunkActionResult => async (
  dispatch,
  _,
  api,
) => {
  try {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  } catch (e) {
    toast.error(TRY_AGAIN_ERROR);
  }
};
