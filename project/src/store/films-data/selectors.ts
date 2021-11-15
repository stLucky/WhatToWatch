import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { FilmsType, FilmType } from '../../types/films';

export const getFilms = (state: State): FilmsType =>
  state[NameSpace.dataFilms].films;

export const getFilm = (state: State): FilmType =>
  state[NameSpace.dataFilms].film;

export const getPromo = (state: State): FilmType =>
  state[NameSpace.dataFilms].promo;

export const getSimilar = (state: State): FilmsType =>
  state[NameSpace.dataFilms].similar;

export const getLoadingFilmsStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isFilmsLoading;

export const getErrorFilmsStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isFilmsError;

export const getLoadingPromoStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isPromoLoading;

export const getErrorPromoStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isPromoError;

export const getLoadingFilmStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isFilmLoading;

export const getErrorFilmStatus = (state: State): string =>
  state[NameSpace.dataFilms].filmError;

export const getLoadingSimilarStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isSimilarLoading;

export const getErrorSimilarStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isSimilarError;

export const getMyList = (state: State): FilmsType =>
  state[NameSpace.dataFilms].myList;

export const getLoadingMyListStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isMyListLoading;

export const getErrorMyListStatus = (state: State): boolean =>
  state[NameSpace.dataFilms].isMyListError;
