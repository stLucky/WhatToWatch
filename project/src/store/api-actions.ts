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
  loadAvatar
} from './actions';
import { saveToken, dropToken, Token } from '../services/token';
import {
  APIRoute,
  AuthorizationStatus,
  AppRoute,
  ERROR_404,
  TRY_AGAIN_ERROR,
  OTHER_ERRORS
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

export const fetchFilmAction = (id: number): ThunkActionResult => async (
  dispatch,
  _,
  api,
) => {
  dispatch(loadFilmRequest(true));

  try {
    const { data } = await api.get<FilmType>(`${APIRoute.Films}/${id}`);
    const normalizedData = camelcaseKeys(data);

    dispatch(loadFilmSuccess(normalizedData));
    dispatch(loadFilmError(''));
  } catch (e) {
    e === ERROR_404
      ? dispatch(loadFilmError(ERROR_404.toString()))
      : dispatch(loadFilmError(OTHER_ERRORS));
  } finally {
    dispatch(loadFilmRequest(false));
  }
};

export const fetchSimilarAction = (id: number): ThunkActionResult => async (
  dispatch,
  _,
  api,
) => {
  dispatch(loadSimilarRequest(true));

  try {
    const { data } = await api.get<FilmsType>(`${APIRoute.Films}/${id}/similar`);
    const normalizedData = camelcaseKeys(data);

    dispatch(loadSimilarError(false));
    dispatch(loadSimilarSuccess(normalizedData));
  } catch (e) {
    dispatch(loadSimilarError(true));
  } finally {
    dispatch(loadSimilarRequest(false));
  }
};

export const fetchReviewsAction = (id: number): ThunkActionResult => async (
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
    dispatch(loadReviewsError());
  } finally {
    dispatch(loadReviewsRequest(false));
  }
};

export const fetchSendReviewAction = (
  review: ReviewSend,
  id: number,
): ThunkActionResult => async (dispatch, _, api) => {
  dispatch(sendReviewRequest(true));

  try {
    await api.post<ReviewSend>(`${APIRoute.Reviews}/${id}fghhjhgj`, review);
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
  await api.get(APIRoute.Login).then(() => {
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  });
};

export const loginAction = ({
  login: email,
  password,
}: AuthData): ThunkActionResult => async (dispatch, _, api) => {
  dispatch(authorizationRequest(true));

  try {
    const {
      data: { 'avatar_url': avatar, token },
    } = await api.post<{ 'avatar_url': string; token: Token }>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(token);
    dispatch(loadAvatar(avatar));
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
