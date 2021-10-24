import FilmCard from '../film-card/film-card';
import { Films } from '../../types/films';

type FilmsListProps = {
  films: Films;
  hasPlayer: boolean;
};

function FilmsList({ films, hasPlayer }: FilmsListProps): JSX.Element {
  return (
    <div className={'catalog__films-list'}>
      {films.map((film) => (
        <FilmCard film={film} key={film.id} hasPlayer={hasPlayer} />
      ))}
    </div>
  );
}

export default FilmsList;
