import { ThunkActionResult } from '../types/actions';
import { loadFilms, requireAuthorization, requireLogout, redirectToRoute } from './actions';
import { saveToken, dropToken, Token } from '../services/token';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { FilmsType } from '../types/films';
import { AuthData } from '../types/auth-data';
import camelcaseKeys from 'camelcase-keys';


export const fetchFilmsAction =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const { data } = await api.get<FilmsType>(APIRoute.Films);
      const normalizedData = data.map((film) => camelcaseKeys(film));

      dispatch(loadFilms(normalizedData));
    };

export const checkAuthAction =
  (): ThunkActionResult => async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login).then(() => {
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    });
  };

export const loginAction =
  ({ login: email, password }: AuthData): ThunkActionResult =>
    async (dispatch, _getState, api) => {
      const {
        data: { token },
      } = await api.post<{ token: Token }>(APIRoute.Login, { email, password });
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Root));
    };

export const logoutAction =
  (): ThunkActionResult => async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
