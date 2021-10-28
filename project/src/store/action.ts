import { ActionTypes } from '../types/action';
import { FilmsType } from '../types/films';

export const changeActiveGenre = (genre: string) => ({
  type: ActionTypes.ChangeActiveGenre,
  payload: genre,
} as const);

export const getFilms = (films: FilmsType) => ({
  type: ActionTypes.GetFilms,
  payload: films,
} as const);

export const incrementLimit = (offset: number) => ({
  type: ActionTypes.IncrementLimit,
  payload: offset,
} as const);

export const resetLimit = () => ({
  type: ActionTypes.ResetLimit,
} as const);
