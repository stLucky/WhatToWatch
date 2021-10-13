import { useState } from 'react';
import FilmCard from '../film-card/film-card';
import { Films } from '../../types/films';

type FilmsListProps = {
  films: Films
}

function FilmsList({ films }: FilmsListProps): JSX.Element {
  const [isActiveCard, setActiveCard]= useState<null | number>(null);
  // eslint-disable-next-line no-console
  console.log(isActiveCard);

  return (
    <div className={'catalog__films-list'}>
      {films.map((film) => (
        <FilmCard
          film={film}
          key={film.id}
          onCardEnter={(id) => {
            setActiveCard(id);
          }}
          onCardLeave={(id) => {
            setActiveCard(id);
          }}
        />
      ))}
    </div>
  );
}

export default FilmsList;
