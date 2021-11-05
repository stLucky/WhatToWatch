import { ActionTypes, Actions } from '../types/actions';
import { State } from '../types/state';
import {
  DEFAULT_GENRE,
  SHOWN_COUNT_FILMS,
  AuthorizationStatus
} from '../const';

const initialState = {
  activeGenre: DEFAULT_GENRE,
  films: [],
  limit: SHOWN_COUNT_FILMS,
  authorizationStatus: AuthorizationStatus.Unknown,
  isFilmsLoading: false,
  isFilmsError: false,
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
    case ActionTypes.IncrementLimit:
      return { ...state, limit: state.limit + action.payload };
    case ActionTypes.ResetLimit:
      return { ...state, limit: initialState.limit };
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
