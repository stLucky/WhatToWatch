import { DEFAULT_GENRE, SHOWN_COUNT_FILMS } from '../../const';
import { changeActiveGenre, incrementLimit, resetLimit } from '../actions';
import { app } from './app';

const state = { activeGenre: DEFAULT_GENRE, limit: SHOWN_COUNT_FILMS };

describe('Reducer: app', () => {
  it('without additional parameters should return initial state', () => {
    expect(app(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should set activeGenre to the fantasy genre', () => {
    expect(app(state, changeActiveGenre('fantasy'))).toEqual({
      ...state,
      activeGenre: 'fantasy',
    });
  });

  it('should increment limit by SHOWN_COUNT_FILMS', () => {
    expect(app(state, incrementLimit(SHOWN_COUNT_FILMS))).toEqual({
      ...state,
      limit: state.limit + SHOWN_COUNT_FILMS,
    });
  });

  it('should reset limit to initial value', () => {
    expect(app(state, resetLimit())).toEqual({ ...state, limit: state.limit });
  });
});
