import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {State} from '../types/state';

import {
  changeActiveGenre,
  loadFilmsRequest,
  loadFilmsSuccess,
  loadFilmsError,
  incrementLimit,
  resetLimit,
  requireAuthorization,
  requireLogout,
  authorizationRequest,
  redirectToRoute
} from '../store/actions';

export enum ActionTypes {
  ChangeActiveGenre = 'films/changeGenre',
  IncrementLimit = 'films/incrementLimit',
  ResetLimit = 'films/resetLimit',
  LoadFilmsRequest = 'data/loadFilmsRequest',
  LoadFilmsSuccess = 'data/loadFilmsSuccess',
  LoadFilmsError = 'data/loadFilmsError',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  AuthorizationRequest = 'data/authorizationRequest',
  RedirectToRoute = 'route/redirectToRoute'
}

export type Actions =
  | ReturnType<typeof changeActiveGenre>
  | ReturnType<typeof loadFilmsRequest>
  | ReturnType<typeof loadFilmsSuccess>
  | ReturnType<typeof loadFilmsError>
  | ReturnType<typeof incrementLimit>
  | ReturnType<typeof resetLimit>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof authorizationRequest>
  | ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
