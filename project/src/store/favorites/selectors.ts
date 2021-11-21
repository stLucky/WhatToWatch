import { FilmsType } from '../../types/films';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getMyList = (state: State): FilmsType =>
  state[NameSpace.Favorites].myList;

export const getLoadingMyListStatus = (state: State): boolean =>
  state[NameSpace.Favorites].isMyListLoading;

export const getErrorMyListStatus = (state: State): boolean =>
  state[NameSpace.Favorites].isMyListError;
