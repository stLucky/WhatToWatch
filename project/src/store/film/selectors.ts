import { FilmType } from '../../types/films';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getFilm = (state: State): FilmType => state[NameSpace.Film].film;

export const getLoadingFilmStatus = (state: State): boolean =>
  state[NameSpace.Film].isFilmLoading;

export const getErrorFilmStatus = (state: State): string =>
  state[NameSpace.Film].filmError;
