import { makeFakeFilm } from '../../mocks/films';
import { FilmType } from '../../types/films';
import { loadPromoError, loadPromoRequest, loadPromoSuccess, changeFavoriteStatus } from '../actions';
import {promo} from './promo';


const state = {promo: {} as FilmType, isPromoLoading: false, isPromoError: false };
const fakeFilm = makeFakeFilm();
const favoriteFilm = {...fakeFilm, isFavorite: true};
const notFavoriteFilm = {...fakeFilm, isFavorite: false};

describe('Reducer: promo', () => {
  it('without additional parameters should return initial state', () => {
    expect(promo(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should set value loading by a true', () => {
    expect(promo(state, loadPromoRequest(true)))
      .toEqual({...state, isPromoLoading: true });
  });

  it('should set film will be downloaded from the server', () => {
    expect(promo(state, loadPromoSuccess(fakeFilm)))
      .toEqual({...state, promo: fakeFilm });
  });

  it('should set value error by a true', () => {
    expect(promo(state, loadPromoError(true)))
      .toEqual({...state, isPromoError: true });
  });

  it('should change value isFavorite by a true', () => {
    expect(promo({...state, promo: notFavoriteFilm}, changeFavoriteStatus(favoriteFilm)))
      .toEqual({...state, promo: favoriteFilm });
  });
});
