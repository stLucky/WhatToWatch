import { FilmsType } from '../../types/films';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getSimilar = (state: State): FilmsType =>
  state[NameSpace.SimilarFilms].similar;

export const getLoadingSimilarStatus = (state: State): boolean =>
  state[NameSpace.SimilarFilms].isSimilarLoading;

export const getErrorSimilarStatus = (state: State): boolean =>
  state[NameSpace.SimilarFilms].isSimilarError;
