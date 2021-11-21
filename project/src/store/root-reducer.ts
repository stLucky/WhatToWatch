import { combineReducers } from 'redux';
import { films } from './films/films';
import { app } from './app/app';
import { reviews } from './reviews/reviews';
import { user } from './user/user';
import { favorites } from './favorites/favorites';
import { film } from './film/film';
import { promo } from './promo/promo';
import { similarFilms } from './similar-films/similar-films';

export enum NameSpace {
  Films = 'FILMS',
  Film = 'FILM',
  Promo = 'PROMO',
  SimilarFilms = 'SIMILARFILMS',
  Favorites = 'FAVORITES',
  Reviews = 'REVIEWS',
  App = 'APP',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Films]: films,
  [NameSpace.Film]: film,
  [NameSpace.Promo]: promo,
  [NameSpace.SimilarFilms]: similarFilms,
  [NameSpace.Favorites]: favorites,
  [NameSpace.Reviews]: reviews,
  [NameSpace.App]: app,
  [NameSpace.User]: user,
});

export type RootState = ReturnType<typeof rootReducer>;
