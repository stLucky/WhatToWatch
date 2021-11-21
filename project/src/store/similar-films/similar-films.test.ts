import { similarFilms } from './similar-films';
import { makeFakeFilms } from '../../mocks/films';
import {
  loadSimilarError,
  loadSimilarRequest,
  loadSimilarSuccess
} from '../actions';

const state = { similar: [], isSimilarLoading: false, isSimilarError: false };
const fakeFilms = makeFakeFilms();

describe('Reducer: similarFilms', () => {
  it('without additional parameters should return initial state', () => {
    expect(similarFilms(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should set value loading by a true', () => {
    expect(similarFilms(state, loadSimilarRequest(true))).toEqual({
      ...state,
      isSimilarLoading: true,
    });
  });

  it('should set films will be downloaded from the server', () => {
    expect(similarFilms(state, loadSimilarSuccess(fakeFilms))).toEqual({
      ...state,
      similar: fakeFilms,
    });
  });

  it('should set value error by a true', () => {
    expect(similarFilms(state, loadSimilarError(true))).toEqual({
      ...state,
      isSimilarError: true,
    });
  });
});
