import { RootState } from '../store/root-reducer';
import { FilmsType, FilmType } from './films';
import { ReviewsType } from './reviews';
import { AuthorizationStatus } from '../const';
import { AuthUser } from './auth-data';

export type FilmsData = {
  films: FilmsType;


  isFilmsLoading: boolean;
  isFilmsError: boolean;


};

export type Favorites = {
  myList: FilmsType;
  isMyListLoading: boolean;
  isMyListError: boolean;
}

export type FilmData = {
  film: FilmType;
  filmError: string;
  isFilmLoading: boolean;
}

export type Promo = {
  promo: FilmType;
  isPromoLoading: boolean;
  isPromoError: boolean;
}

export type SimilarFilms = {
  similar: FilmsType;
  isSimilarLoading: boolean;
  isSimilarError: boolean;
}

export type AppProcess = {
  activeGenre: string;
  limit: number;
};

export type ReviewsData = {
  reviews: ReviewsType;
  isReviewsLoading: boolean;
  isReviewsError: boolean;
  isSendReviewLoading: boolean;
};

export type UserProcess = {
  user: AuthUser;
  authorizationStatus: AuthorizationStatus;
  isAuthLoading: boolean;
  isCheckAuthLoading: boolean;
};

export type State = RootState;
