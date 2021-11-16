import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { FilmsType, FilmType } from '../../types/films';
import { DEFAULT_GENRE, MAX_NUMBER_GENRES } from '../../const';
import { createSelector } from '@reduxjs/toolkit';
import { getActiveGenre, getLimit } from '../up-state/selectors';

export const getFilms = (state: State): FilmsType =>
  state[NameSpace.Films].films;

export const getFilm = (state: State): FilmType => state[NameSpace.Films].film;

export const getPromo = (state: State): FilmType =>
  state[NameSpace.Films].promo;

export const getSimilar = (state: State): FilmsType =>
  state[NameSpace.Films].similar;

export const getLoadingFilmsStatus = (state: State): boolean =>
  state[NameSpace.Films].isFilmsLoading;

export const getErrorFilmsStatus = (state: State): boolean =>
  state[NameSpace.Films].isFilmsError;

export const getLoadingPromoStatus = (state: State): boolean =>
  state[NameSpace.Films].isPromoLoading;

export const getErrorPromoStatus = (state: State): boolean =>
  state[NameSpace.Films].isPromoError;

export const getLoadingFilmStatus = (state: State): boolean =>
  state[NameSpace.Films].isFilmLoading;

export const getErrorFilmStatus = (state: State): string =>
  state[NameSpace.Films].filmError;

export const getLoadingSimilarStatus = (state: State): boolean =>
  state[NameSpace.Films].isSimilarLoading;

export const getErrorSimilarStatus = (state: State): boolean =>
  state[NameSpace.Films].isSimilarError;

export const getMyList = (state: State): FilmsType =>
  state[NameSpace.Films].myList;

export const getLoadingMyListStatus = (state: State): boolean =>
  state[NameSpace.Films].isMyListLoading;

export const getErrorMyListStatus = (state: State): boolean =>
  state[NameSpace.Films].isMyListError;

export const getGenres = createSelector(getFilms, (films) => {
  const genres = [DEFAULT_GENRE, ...new Set(films.map((film) => film.genre))];

  if (genres.length > MAX_NUMBER_GENRES) {
    genres.length = MAX_NUMBER_GENRES;
  }

  return genres;
});

export const getFilteredFilms = createSelector(
  [getActiveGenre, getFilms],
  (activeGenre, films) =>
    activeGenre === DEFAULT_GENRE
      ? films
      : films.filter((film) => film.genre === activeGenre),
);

export const getRenderedFilms = createSelector(
  [getFilteredFilms, getLimit],
  (filteredFilms, limit) => filteredFilms.slice(0, limit),
);

export const getCurrentFilm = createSelector([getFilms, (_state: State, id: string) => id,
], (films, id) =>
  films.find((film) => film.id === +id),
);
