import { ActionTypes } from '../types/actions';
import { FilmsType } from '../types/films';
import {AppRoute, AuthorizationStatus} from '../const';

export const changeActiveGenre = (genre: string) => ({
  type: ActionTypes.ChangeActiveGenre,
  payload: genre,
} as const);

export const loadFilms = (films: FilmsType) => ({
  type: ActionTypes.LoadFilms,
  payload: films,
} as const);

export const incrementLimit = (offset: number) => ({
  type: ActionTypes.IncrementLimit,
  payload: offset,
} as const);

export const resetLimit = () => ({
  type: ActionTypes.ResetLimit,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionTypes.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionTypes.RequireLogout,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionTypes.RedirectToRoute,
  payload: url,
} as const);
