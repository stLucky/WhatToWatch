import { makeFakeFilms } from '../../mocks/films';
import {
  loadMyListError,
  loadMyListRequest,
  loadMyListSuccess
} from '../actions';
import { favorites } from './favorites';

const state = { myList: [], isMyListLoading: false, isMyListError: false };
const fakeFilms = makeFakeFilms();

describe('Reducer: favorites', () => {
  it('without additional parameters should return initial state', () => {
    expect(favorites(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should set value loading by a true', () => {
    expect(favorites(state, loadMyListRequest(true))).toEqual({
      ...state,
      isMyListLoading: true,
    });
  });

  it('should set film will be downloaded from the server', () => {
    expect(favorites(state, loadMyListSuccess(fakeFilms))).toEqual({
      ...state,
      myList: fakeFilms,
    });
  });

  it('should set value error by a true', () => {
    expect(favorites(state, loadMyListError(true))).toEqual({
      ...state,
      isMyListError: true,
    });
  });
});
