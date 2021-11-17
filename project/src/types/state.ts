import { RootState } from '../store/root-reducer';
import { FilmsType, FilmType } from './films';
import { ReviewsType } from './reviews';
import { AuthorizationStatus } from '../const';
import { AuthUser } from './auth-data';

export type FilmsData = {
  films: FilmsType;
  myList: FilmsType;
  promo: FilmType;
  film: FilmType;
  similar: FilmsType;
  isFilmsLoading: boolean;
  isFilmsError: boolean;
  isPromoLoading: boolean;
  isPromoError: boolean;
  isFilmLoading: boolean;
  filmError: string;
  isSimilarLoading: boolean;
  isSimilarError: boolean;
  isMyListLoading: boolean;
  isMyListError: boolean;
};

export type FilmsProcess = {
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
};

export type State = RootState;
