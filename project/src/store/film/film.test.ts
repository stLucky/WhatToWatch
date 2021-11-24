import { makeFakeFilm } from '../../mocks/films';
import { FilmType } from '../../types/films';
import {
  changeFavoriteStatus,
  loadFilmError,
  loadFilmRequest,
  loadFilmSuccess
} from '../actions';
import { film } from './film';

const state = { film: {} as FilmType, isFilmLoading: false, filmError: '' };
const fakeFilm = makeFakeFilm();
const favoriteFilm = { ...fakeFilm, isFavorite: true };
const notFavoriteFilm = { ...fakeFilm, isFavorite: false };

describe('Reducer: film', () => {
  it('without additional parameters should return initial state', () => {
    expect(film(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should set value loading by a true', () => {
    expect(film(state, loadFilmRequest(true))).toEqual({
      ...state,
      isFilmLoading: true,
    });
  });

  it('should set film will be downloaded from the server', () => {
    expect(film(state, loadFilmSuccess(fakeFilm))).toEqual({
      ...state,
      film: fakeFilm,
    });
  });

  it('should set value error by a 404', () => {
    expect(film(state, loadFilmError('404'))).toEqual({
      ...state,
      filmError: '404',
    });
  });

  it('should change value isFavorite by a true', () => {
    expect(
      film(
        { ...state, film: notFavoriteFilm },
        changeFavoriteStatus(favoriteFilm),
      ),
    ).toEqual({ ...state, film: favoriteFilm });
  });
});
