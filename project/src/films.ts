import { Films } from './types/films';
import { films } from './mocks/films';
import { DEFAULT_GENRE, MAX_NUMBER_GENRES } from './const';


// Вот тоже незнаю куда подобные функции вынести? В компоненте лучше оставить или
//тут в отдельном модуле наоборот как можно
// меньше компоненты засоряя вспомогательными функциями
export const getFilteredFilms = (genre: string): Films => {
  if (genre === DEFAULT_GENRE) {
    return films;
  }

  const filteredFilms = films.filter((film) => film.genre === genre);

  return filteredFilms;
};


export const getGenres = (): string[] => {
  const genres = [DEFAULT_GENRE, ...new Set(films.map((film) => film.genre))];

  if (genres.length > MAX_NUMBER_GENRES) {
    genres.length = MAX_NUMBER_GENRES;
  }

  return  genres;
};
