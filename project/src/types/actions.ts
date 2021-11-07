import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {State} from '../types/state';

import {
  changeActiveGenre,
  loadFilmsRequest,
  loadFilmsSuccess,
  loadFilmsError,
  loadFilmRequest,
  loadFilmSuccess,
  loadFilmError,
  sendReviewRequest,
  loadSimilarRequest,
  loadSimilarSuccess,
  loadSimilarError,
  loadReviewsRequest,
  loadReviewsSuccess,
  loadReviewsError,
  incrementLimit,
  resetLimit,
  requireAuthorization,
  requireLogout,
  authorizationRequest,
  redirectToRoute,
  loadAvatar
} from '../store/actions';

export enum ActionTypes {
  ChangeActiveGenre = 'films/changeGenre',
  IncrementLimit = 'films/incrementLimit',
  ResetLimit = 'films/resetLimit',
  LoadFilmsRequest = 'data/loadFilmsRequest',
  LoadFilmsSuccess = 'data/loadFilmsSuccess',
  LoadFilmsError = 'data/loadFilmsError',
  LoadFilmRequest = 'data/loadFilmRequest',
  LoadFilmSuccess = 'data/loadFilmSuccess',
  LoadFilmError = 'data/loadFilmError',
  LoadSimilarRequest = 'data/loadSimilarRequest',
  LoadSimilarSuccess = 'data/loadSimilarSuccess',
  LoadSimilarError = 'data/loadSimilarError',
  LoadReviewsRequest = 'data/loadReviewsRequest',
  LoadReviewsSuccess = 'data/loadReviewsSuccess',
  LoadReviewsError = 'data/loadReviewsError',
  SendReviewRequest = 'data/sendReviewRequest',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  AuthorizationRequest = 'data/authorizationRequest',
  RedirectToRoute = 'route/redirectToRoute',
  LoadAvatar = 'data/loadAvatar'
}

export type Actions =
  | ReturnType<typeof changeActiveGenre>
  | ReturnType<typeof loadFilmsRequest>
  | ReturnType<typeof loadFilmsSuccess>
  | ReturnType<typeof loadFilmsError>
  | ReturnType<typeof loadFilmRequest>
  | ReturnType<typeof loadFilmSuccess>
  | ReturnType<typeof loadFilmError>
  | ReturnType<typeof loadSimilarRequest>
  | ReturnType<typeof loadSimilarSuccess>
  | ReturnType<typeof loadSimilarError>
  | ReturnType<typeof loadReviewsRequest>
  | ReturnType<typeof loadReviewsSuccess>
  | ReturnType<typeof loadReviewsError>
  | ReturnType<typeof sendReviewRequest>
  | ReturnType<typeof incrementLimit>
  | ReturnType<typeof resetLimit>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof authorizationRequest>
  | ReturnType<typeof loadAvatar>
  | ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
