import { ActionTypes, Actions } from '../types/actions';
import { State } from '../types/state';
import {
  DEFAULT_GENRE,
  SHOWN_COUNT_FILMS,
  AuthorizationStatus
} from '../const';
import { FilmType } from '../types/films';

const initialState = {
  activeGenre: DEFAULT_GENRE,
  films: [],
  film: {} as FilmType,
  similar: [],
  reviews: [],
  limit: SHOWN_COUNT_FILMS,
  authorizationStatus: AuthorizationStatus.Unknown,
  avatar: '',
  isFilmsLoading: false,
  isFilmsError: false,
  isFilmLoading: false,
  filmError: '',
  isSimilarLoading: false,
  isSimilarError: false,
  isReviewsLoading: false,
  isReviewsError: false,
  isSendReviewLoading: false,
  isAuthLoading: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.ChangeActiveGenre:
      return { ...state, activeGenre: action.payload };
    case ActionTypes.LoadFilmsRequest:
      return { ...state, isFilmsLoading: action.payload };
    case ActionTypes.LoadFilmsSuccess:
      return { ...state, films: action.payload };
    case ActionTypes.LoadFilmsError:
      return { ...state, isFilmsError: true };
    case ActionTypes.LoadFilmRequest:
      return { ...state, isFilmLoading: action.payload };
    case ActionTypes.LoadFilmSuccess:
      return { ...state, film: action.payload };
    case ActionTypes.LoadFilmError:
      return { ...state, filmError: action.payload };
    case ActionTypes.LoadSimilarRequest:
      return { ...state, isSimilarLoading: action.payload };
    case ActionTypes.LoadSimilarSuccess:
      return { ...state, similar: action.payload };
    case ActionTypes.LoadSimilarError:
      return { ...state, isSimilarError: action.payload };
    case ActionTypes.LoadReviewsRequest:
      return { ...state, isReviewsLoading: action.payload };
    case ActionTypes.LoadReviewsSuccess:
      return { ...state, reviews: action.payload };
    case ActionTypes.LoadReviewsError:
      return { ...state, isReviewsError: true };
    case ActionTypes.SendReviewRequest:
      return { ...state, isSendReviewLoading: action.payload };
    case ActionTypes.IncrementLimit:
      return { ...state, limit: state.limit + action.payload };
    case ActionTypes.ResetLimit:
      return { ...state, limit: initialState.limit };
    case ActionTypes.LoadAvatar:
      return { ...state, avatar: action.payload };
    case ActionTypes.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionTypes.RequireLogout:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth };
    case ActionTypes.AuthorizationRequest:
      return { ...state, isAuthLoading: action.payload };
    default:
      return state;
  }
};

export { reducer };
