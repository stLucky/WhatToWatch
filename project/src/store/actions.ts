import { createAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../types/actions';
import { FilmsType, FilmType } from '../types/films';
import { AuthorizationStatus } from '../const';
import { ReviewsType } from '../types/reviews';
import { AuthUser } from '../types/auth-data';

export const changeActiveGenre = createAction<string>(ActionTypes.ChangeActiveGenre);
export const loadFilmsRequest = createAction<boolean>(ActionTypes.LoadFilmsRequest);
export const loadFilmsSuccess = createAction<FilmsType>(ActionTypes.LoadFilmsSuccess);
export const loadFilmsError = createAction(ActionTypes.LoadFilmsError);
export const loadFilmRequest = createAction<boolean>(ActionTypes.LoadFilmRequest);
export const loadFilmSuccess = createAction<FilmType>(ActionTypes.LoadFilmSuccess);
export const loadFilmError = createAction<string>(ActionTypes.LoadFilmError);
export const loadPromoRequest = createAction<boolean>(ActionTypes.LoadPromoRequest);
export const loadPromoSuccess = createAction<FilmType>(ActionTypes.LoadPromoSuccess);
export const loadPromoError = createAction<boolean>(ActionTypes.LoadPromoError);
export const loadSimilarRequest = createAction<boolean>(ActionTypes.LoadSimilarRequest);
export const loadSimilarSuccess = createAction<FilmsType>(ActionTypes.LoadSimilarSuccess);
export const loadSimilarError = createAction<boolean>(ActionTypes.LoadSimilarError);
export const loadReviewsRequest = createAction<boolean>(ActionTypes.LoadReviewsRequest);
export const loadReviewsSuccess = createAction<ReviewsType>(ActionTypes.LoadReviewsSuccess);
export const loadReviewsError = createAction<boolean>(ActionTypes.LoadReviewsError);
export const sendReviewRequest = createAction<boolean>(ActionTypes.SendReviewRequest);
export const incrementLimit = createAction<number>(ActionTypes.IncrementLimit);
export const resetLimit = createAction(ActionTypes.ResetLimit);
export const requireAuthorization = createAction<AuthorizationStatus>(
  ActionTypes.RequireAuthorization,
);
export const authorizationRequest = createAction<boolean>(
  ActionTypes.AuthorizationRequest,
);
export const checkAuthRequest = createAction<boolean>(
  ActionTypes.CheckAuthRequest,
);
export const requireLogout = createAction(ActionTypes.RequireLogout);
export const redirectToRoute = createAction<string>(ActionTypes.RedirectToRoute);
export const set404Error = createAction<boolean>(ActionTypes.RequireLogout);
export const loadUser = createAction<AuthUser>(ActionTypes.LoadUser);
export const changeFavoriteStatus = createAction<FilmType>(ActionTypes.ChangeFavoriteStatus);
export const loadMyListRequest = createAction<boolean>(ActionTypes.LoadMyListRequest);
export const loadMyListSuccess = createAction<FilmsType>(ActionTypes.LoadMyListSuccess);
export const loadMyListError = createAction<boolean>(ActionTypes.LoadMyListError);
