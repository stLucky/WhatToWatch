import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {State} from '../types/state';

import {
  changeActiveGenre,
  loadFilms,
  incrementLimit,
  resetLimit,
  requireAuthorization,
  requireLogout,
  redirectToRoute
} from '../store/actions';

export enum ActionTypes {
  ChangeActiveGenre = 'films/changeGenre',
  IncrementLimit = 'films/incrementLimit',
  ResetLimit = 'films/resetLimit',
  LoadFilms = 'data/loadFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'route/redirectToRoute'
}

export type Actions =
  | ReturnType<typeof changeActiveGenre>
  | ReturnType<typeof loadFilms>
  | ReturnType<typeof incrementLimit>
  | ReturnType<typeof resetLimit>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
