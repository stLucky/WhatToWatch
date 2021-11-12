import { ThunkActionResult } from '../types/actions';
import {
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  loadFilmsSuccess,
  loadFilmsRequest,
  loadFilmsError,
  authorizationRequest,
  loadFilmRequest,
  loadFilmSuccess,
  loadFilmError,
  loadSimilarRequest,
  loadSimilarSuccess,
  loadSimilarError,
  loadReviewsRequest,
  loadReviewsSuccess,
  loadReviewsError,
  sendReviewRequest,
  loadUser
} from './actions';
import { saveToken, dropToken } from '../services/token';
import {
  APIRoute,
  AuthorizationStatus,
  AppRoute,
  ERROR_404,
  TRY_AGAIN_ERROR,
  OTHER_ERRORS,
  AUTH_ERROR
} from '../const';
import { FilmsType, FilmType } from '../types/films';
import { AuthData } from '../types/auth-data';
import camelcaseKeys from 'camelcase-keys';
import { toast } from 'react-toastify';
import { ReviewSend, ReviewsType } from '../types/reviews';

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

export const fetchFilmAction = (id: string): ThunkActionResult => async (
  dispatch,
  getState,
  api,
) => {
  dispatch(loadFilmRequest(true));

  try {
    getState().FILMS_DATA.filmError && dispatch(loadFilmError(''));

    const { data } = await api.get<FilmType>(`${APIRoute.Films}/${id}`);
    const normalizedData = camelcaseKeys(data);

    dispatch(loadFilmSuccess(normalizedData));

  } catch (e) {
    e === ERROR_404
      ? dispatch(loadFilmError(ERROR_404.toString()))
      : dispatch(loadFilmError(OTHER_ERRORS));
  } finally {
    dispatch(loadFilmRequest(false));
  }
};

export const fetchSimilarAction = (id: string): ThunkActionResult => async (
  dispatch,
  getState,
  api,
) => {
  dispatch(loadSimilarRequest(true));

  try {
    getState().FILMS_DATA.isSimilarError && dispatch(loadSimilarError(false));

    const { data } = await api.get<FilmsType>(`${APIRoute.Films}/${id}/similar`);
    const normalizedData = camelcaseKeys(data);

    dispatch(loadSimilarSuccess(normalizedData));
  } catch (e) {
    dispatch(loadSimilarError(true));
  } finally {
    dispatch(loadSimilarRequest(false));
  }
};

export const fetchReviewsAction = (id: string): ThunkActionResult => async (
  dispatch,
  _,
  api,
) => {
  dispatch(loadReviewsRequest(true));
  try {
    const { data } = await api.get<ReviewsType>(`${APIRoute.Reviews}/${id}`);
    const normalizedData = camelcaseKeys(data);

    dispatch(loadReviewsSuccess(normalizedData));
  } catch (e) {
    dispatch(loadReviewsError(true));
  } finally {
    dispatch(loadReviewsRequest(false));
  }
};

export const fetchSendReviewAction = (
  review: ReviewSend,
  id: string,
): ThunkActionResult => async (dispatch, _, api) => {
  dispatch(sendReviewRequest(true));

  try {
    await api.post<ReviewSend>(`${APIRoute.Reviews}/${id}`, review);
    dispatch(redirectToRoute(`/films/${id}`));
  } catch (e) {
    toast.error(TRY_AGAIN_ERROR);
  } finally {
    dispatch(sendReviewRequest(false));
  }
};

export const checkAuthAction = (): ThunkActionResult => async (
  dispatch,
  _,
  api,
) => {
  try {
    const { data } = await api.get(APIRoute.Login);
    const normalizedUser = camelcaseKeys(data);

    dispatch(loadUser(normalizedUser));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch (e) {
    toast.info(AUTH_ERROR, {position: 'bottom-right', theme: 'dark'});
  }
};

export const loginAction = ({
  login: email,
  password,
}: AuthData): ThunkActionResult => async (dispatch, _, api) => {
  dispatch(authorizationRequest(true));

  try {
    const { data: {token, ...rest} } = await api.post(APIRoute.Login, {
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
