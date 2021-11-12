import { combineReducers } from 'redux';
import { FilmsData, FilmsProcess, ReviewsData, UserProcess } from '../types/state';
import { filmsData } from './films-data/films-data';
import { filmsProcess } from './films-process/films-process';
import { reviewsData } from './reviews-data/reviews-data';
import { userProcess } from './user-process/user-process';

export enum NameSpace {
  dataFilms = 'FILMS_DATA',
  dataReviews = 'REVIEWS_DATA',
  process = 'FILMS_PROCESS',
  user = 'USER',
}

export type RootState = {
  [NameSpace.dataFilms]: FilmsData,
  [NameSpace.dataReviews]: ReviewsData,
  [NameSpace.process]: FilmsProcess,
  [NameSpace.user]: UserProcess,
}

export const rootReducer = combineReducers({
  [NameSpace.dataFilms]: filmsData,
  [NameSpace.dataReviews]: reviewsData,
  [NameSpace.process]: filmsProcess,
  [NameSpace.user]: userProcess,
});

// export type RootState = ReturnType<typeof rootReducer>;

