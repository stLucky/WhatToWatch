import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { AuthUser } from '../../types/auth-data';
import { AuthorizationStatus } from '../../const';

export const getUser = (state: State): AuthUser => state[NameSpace.user].user;

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.user].authorizationStatus;

export const getLoadinAuthStatus = (state: State): boolean =>
  state[NameSpace.user].isAuthLoading;
