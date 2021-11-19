import { FilmType } from '../../types/films';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getPromo = (state: State): FilmType =>
  state[NameSpace.Promo].promo;

export const getLoadingPromoStatus = (state: State): boolean =>
  state[NameSpace.Promo].isPromoLoading;

export const getErrorPromoStatus = (state: State): boolean =>
  state[NameSpace.Promo].isPromoError;
