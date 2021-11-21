import { datatype, lorem, image, time } from 'faker';

import { FilmsType, FilmType } from '../types/films';
const STARRING_COUNT = 5;
const FILMS_COUNT = 20;

export const makeFakeFilm = (): FilmType => ({
  id: datatype.number(),
  name: lorem.words(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: image.imageUrl(),
  videoLink: image.imageUrl(),
  previewVideoLink: image.imageUrl(),
  description: lorem.sentences(),
  rating: datatype.number(),
  scoresCount: datatype.number(),
  director: lorem.word(),
  starring: new Array(STARRING_COUNT).fill(null).map(() => lorem.word()),
  runTime: time.recent(),
  genre: lorem.word(),
  released: datatype.number(),
  isFavorite: datatype.boolean(),
});

export const makeFakeFilms = (): FilmsType => new Array(FILMS_COUNT)
  .fill(null)
  .map(() => makeFakeFilm());
