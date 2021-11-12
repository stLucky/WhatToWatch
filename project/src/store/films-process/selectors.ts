import { NameSpace } from '../root-reducer';
import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { DEFAULT_GENRE, MAX_NUMBER_GENRES } from '../../const';
import { getFilms } from '../films-data/selectors';


export const getActiveGenre = (state: State): string =>
  state[NameSpace.process].activeGenre;

export const getLimit = (state: State): number =>
  state[NameSpace.process].limit;

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
    activeGenre === DEFAULT_GENRE ? films : films.filter((film) => film.genre === activeGenre),
);

export const getRenderedFilms = createSelector(
  [getFilteredFilms, getLimit],
  (filteredFilms, limit) => filteredFilms.slice(0, limit),
);

