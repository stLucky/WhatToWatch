import { changeGenre, getFilms, incrementCounter, resetCounter } from '../store/action';

export enum ActionTypes {
  ChangeGenre = 'films/changeGenre',
  GetFilms = 'films/getFilms',
  IncrementCounter = 'films/incrementCounter',
  ResetCounter = 'films/resetCounter',
}

export type Actions =
  | ReturnType<typeof changeGenre>
  | ReturnType<typeof getFilms>
  | ReturnType<typeof incrementCounter>
  | ReturnType<typeof resetCounter>;
