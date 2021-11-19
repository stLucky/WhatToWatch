import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';


export enum ActionTypes {
  ChangeActiveGenre = 'films/changeGenre',
  IncrementLimit = 'films/incrementLimit',
  ResetLimit = 'films/resetLimit',
  LoadFilmsRequest = 'data/loadFilmsRequest',
  LoadFilmsSuccess = 'data/loadFilmsSuccess',
  LoadFilmsError = 'data/loadFilmsError',
  LoadFilmRequest = 'data/loadFilmRequest',
  LoadFilmSuccess = 'data/loadFilmSuccess',
  LoadFilmError = 'data/loadFilmError',
  LoadPromoRequest = 'data/loadPromoRequest',
  LoadPromoSuccess = 'data/loadPromoSuccess',
  LoadPromoError = 'data/loadPromoError',
  LoadSimilarRequest = 'data/loadSimilarRequest',
  LoadSimilarSuccess = 'data/loadSimilarSuccess',
  LoadSimilarError = 'data/loadSimilarError',
  LoadReviewsRequest = 'data/loadReviewsRequest',
  LoadReviewsSuccess = 'data/loadReviewsSuccess',
  LoadReviewsError = 'data/loadReviewsError',
  SendReviewRequest = 'data/sendReviewRequest',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  AuthorizationRequest = 'data/authorizationRequest',
  RedirectToRoute = 'route/redirectToRoute',
  LoadUser = 'data/loadUser',
  ChangeFavoriteStatus = 'data/changeFavoriteStatus',
  LoadMyListRequest = 'data/loadMyListRequest',
  LoadMyListSuccess = 'data/loadMyListSuccess',
  LoadMyListError = 'data/loadMyListError',
  CheckAuthRequest = 'data/checkAuthRequest'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  Action
>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
