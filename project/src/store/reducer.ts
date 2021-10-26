import { ActionTypes, Actions } from '../types/action';
import { State } from '../types/state';
import { DEFAULT_GENRE, SHOWN_COUNT_FILMS } from '../const';
import { films } from '../mocks/films';

const initialState = {
  genre: DEFAULT_GENRE,
  films: films,
  counter: SHOWN_COUNT_FILMS,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.ChangeGenre:
      return { ...state, genre: action.payload };
    case ActionTypes.GetFilms:
      return { ...state, films: action.payload };
    case ActionTypes.IncrementCounter:
      return { ...state, counter: state.counter + SHOWN_COUNT_FILMS };
    case ActionTypes.ResetCounter:
      return { ...state, counter: SHOWN_COUNT_FILMS };
    default:
      return state;
  }
};

export { reducer };
