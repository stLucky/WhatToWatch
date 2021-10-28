import Card from '../card/card';
import { FilmsType } from '../../types/films';

type FilmsProps = {
  films: FilmsType;
  hasPlayer: boolean;
};

function Films({ films, hasPlayer }: FilmsProps): JSX.Element {
  return (
    <div className={'catalog__films-list'}>
      {films.map((film) => (
        <Card film={film} key={film.id} hasPlayer={hasPlayer} />
      ))}
    </div>
  );
}

export default Films;
