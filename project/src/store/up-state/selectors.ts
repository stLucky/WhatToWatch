import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getActiveGenre = (state: State): string =>
  state[NameSpace.UpState].activeGenre;

export const getLimit = (state: State): number =>
  state[NameSpace.UpState].limit;
