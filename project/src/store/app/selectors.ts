import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getActiveGenre = (state: State): string =>
  state[NameSpace.App].activeGenre;

export const getLimit = (state: State): number =>
  state[NameSpace.App].limit;
