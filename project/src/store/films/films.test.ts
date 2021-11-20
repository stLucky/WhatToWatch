import {films} from './films';
import {loadFilmsError, loadFilmsRequest, loadFilmsSuccess} from '../actions';
import { makeFakeFilms } from '../../mocks/films';

const state = {films: [], isFilmsLoading: false, isFilmsError: false };
const fakeFilms = makeFakeFilms();

describe('Reducer: films', () => {
  it('without additional parameters should return initial state', () => {
    expect(films(void 0, {type: 'UNKNOWN_ACTION'}))
    // TODO НЕ ПОНИМАЮ ПОЧЕМУ В INITIAL STATE ПЕРЕДАЮТ UNDEFINED, А НЕ STATE. В ЧЕМ СМЫСЛ?
    // TODO СМЫСЛ В НЕИЗВЕСТНОМ ДЕЙСТВИИ ПОНЯТЕН, ЧТОБЫ ПРОВЕРИТЬ ЧТОБЫ НЕ ИЗМЕНИЛСЯ СТЕЙТ...
      .toEqual(state);
  });

  it('should set value loading by a true', () => {
    expect(films(state, loadFilmsRequest(true)))
      .toEqual({...state, isFilmsLoading: true });
  });

  it('should set films will be downloaded from the server', () => {
    expect(films(state, loadFilmsSuccess(fakeFilms)))
      .toEqual({...state, films: fakeFilms });
  });

  it('should set value error by a true', () => {
    expect(films(state, loadFilmsError()))
      .toEqual({...state, isFilmsError: true });
  });
});
