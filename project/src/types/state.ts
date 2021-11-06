import { FilmsType } from './films';
import {AuthorizationStatus} from '../const';

export type State = {
  activeGenre: string,
  films: FilmsType,
  limit: number,
  authorizationStatus: AuthorizationStatus,
  isFilmsLoading: boolean,
  isFilmsError: boolean,
  isAuthLoading: boolean
};
