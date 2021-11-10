import { FilmsType, FilmType } from './films';
import { ReviewsType } from './reviews';
import {AuthorizationStatus} from '../const';
import { AuthUser } from './auth-data';

export type State = {
  activeGenre: string,
  films: FilmsType,
  film: FilmType,
  similar: FilmsType,
  reviews: ReviewsType,
  limit: number,
  authorizationStatus: AuthorizationStatus,
  user: AuthUser,
  isFilmsLoading: boolean,
  isFilmsError: boolean,
  isAuthLoading: boolean,
  isFilmLoading: boolean,
  filmError: string,
  isSimilarLoading: boolean,
  isSimilarError: boolean,
  isReviewsLoading: boolean,
  isReviewsError: boolean,
  isSendReviewLoading: boolean,
};
