import { ActionTypes } from '../types/actions';
import { FilmsType, FilmType } from '../types/films';
import { AuthorizationStatus} from '../const';
import { ReviewsType } from '../types/reviews';

export const changeActiveGenre = (genre: string) => ({
  type: ActionTypes.ChangeActiveGenre,
  payload: genre,
} as const);

export const loadFilmsRequest = (hasRequest: boolean) => ({
  type: ActionTypes.LoadFilmsRequest,
  payload: hasRequest,
} as const);

export const loadFilmsSuccess = (films: FilmsType) => ({
  type: ActionTypes.LoadFilmsSuccess,
  payload: films,
} as const);

export const loadFilmsError = () => ({
  type: ActionTypes.LoadFilmsError,
} as const);

export const loadFilmRequest = (hasRequest: boolean) => ({
  type: ActionTypes.LoadFilmRequest,
  payload: hasRequest,
} as const);

export const loadFilmSuccess = (film: FilmType) => ({
  type: ActionTypes.LoadFilmSuccess,
  payload: film,
} as const);

export const loadFilmError = (type: string) => ({
  type: ActionTypes.LoadFilmError,
  payload: type,
} as const);

export const loadSimilarRequest = (hasRequest: boolean) => ({
  type: ActionTypes.LoadSimilarRequest,
  payload: hasRequest,
} as const);

export const loadSimilarSuccess = (films: FilmsType) => ({
  type: ActionTypes.LoadSimilarSuccess,
  payload: films,
} as const);

export const loadSimilarError = (hasError: boolean) => ({
  type: ActionTypes.LoadSimilarError,
  payload: hasError,
} as const);

export const loadReviewsRequest = (hasRequest: boolean) => ({
  type: ActionTypes.LoadReviewsRequest,
  payload: hasRequest,
} as const);

export const loadReviewsSuccess = (reviews: ReviewsType) => ({
  type: ActionTypes.LoadReviewsSuccess,
  payload: reviews,
} as const);

export const loadReviewsError = () => ({
  type: ActionTypes.LoadReviewsError,
} as const);

export const sendReviewRequest = (hasRequest: boolean) => ({
  type: ActionTypes.SendReviewRequest,
  payload: hasRequest,
} as const);

export const incrementLimit = (offset: number) => ({
  type: ActionTypes.IncrementLimit,
  payload: offset,
} as const);

export const resetLimit = () => ({
  type: ActionTypes.ResetLimit,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionTypes.RequireAuthorization,
  payload: authStatus,
} as const);

export const authorizationRequest = (hasRequest: boolean) => ({
  type: ActionTypes.AuthorizationRequest,
  payload: hasRequest,
} as const);

export const requireLogout = () => ({
  type: ActionTypes.RequireLogout,
} as const);

export const redirectToRoute = (url: string) => ({
  type: ActionTypes.RedirectToRoute,
  payload: url,
} as const);

export const set404Error = (hasError: boolean) => ({
  type: ActionTypes.RequireLogout,
  payload: hasError,
} as const);

export const loadAvatar = (avatar: string) => ({
  type: ActionTypes.LoadAvatar,
  payload: avatar,
} as const);
