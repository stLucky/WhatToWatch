import { ActionTypes } from '../types/action';
import { Films } from '../types/films';

export const changeGenre = (genre: string) => ({
  type: ActionTypes.ChangeGenre,
  payload: genre,
} as const);

export const getFilms = (films: Films) => ({
  type: ActionTypes.GetFilms,
  payload: films,
} as const);

export const incrementCounter = () => ({
  type: ActionTypes.IncrementCounter,
} as const);

export const resetCounter = () => ({
  type: ActionTypes.ResetCounter,
} as const);
