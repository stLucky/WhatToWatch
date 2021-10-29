import { FilmsType } from './films';

export type State = {
  activeGenre: string,
  films: FilmsType,
  limit: number
};
