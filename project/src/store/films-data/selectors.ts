import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { FilmsType, FilmType } from '../../types/films';


export const getFilms = (state: State): FilmsType =>
  state[NameSpace.dataFilms].films;

export const getFilm = (state: State): FilmType =>
  state[NameSpace.dataFilms].film;

export const getSimilar = (state: State): FilmsType =>
  state[NameSpace.dataFilms].similar;

export const getLoadingFilmsStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isFilmsLoading;

export const getErrorFilmsStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isFilmsError;

export const getLoadingFilmStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isFilmLoading;

export const getErrorFilmStatus = (state: State): string =>
  state[NameSpace.dataFilms].filmError;

export const getLoadingSimilarStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isSimilarLoading;

export const getErrorSimilarStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isSimilarError;


