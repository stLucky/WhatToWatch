import { ActionTypes, Actions } from '../types/action';
import { State } from '../types/state';
import { DEFAULT_GENRE, SHOWN_COUNT_FILMS } from '../const';
import { films } from '../mocks/films';

const initialState = {
  activeGenre: DEFAULT_GENRE,
  films: films,
  limit: SHOWN_COUNT_FILMS,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.ChangeActiveGenre:
      return { ...state, activeGenre: action.payload };
    case ActionTypes.GetFilms:
      return { ...state, films: action.payload };
    case ActionTypes.IncrementLimit:
      return { ...state, limit: state.limit + action.payload };
    case ActionTypes.ResetLimit:
      return { ...state, limit: initialState.limit };
    default:
      return state;
  }
};

export { reducer };
