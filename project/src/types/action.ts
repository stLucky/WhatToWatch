import { changeActiveGenre, getFilms, incrementLimit, resetLimit } from '../store/action';

export enum ActionTypes {
  ChangeActiveGenre = 'films/changeGenre',
  GetFilms = 'films/getFilms',
  IncrementLimit = 'films/incrementLimit',
  ResetLimit = 'films/resetLimit',
}

export type Actions =
  | ReturnType<typeof changeActiveGenre>
  | ReturnType<typeof getFilms>
  | ReturnType<typeof incrementLimit>
  | ReturnType<typeof resetLimit>;
