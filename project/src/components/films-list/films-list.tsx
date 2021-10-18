import { useState } from 'react';
import FilmCard from '../film-card/film-card';
import { Films } from '../../types/films';

type FilmsListProps = {
  films: Films
}

function FilmsList({ films }: FilmsListProps): JSX.Element {
  type ActiveCard = null | number

  const [activeCard, setActiveCard]= useState<ActiveCard>(null);
  // eslint-disable-next-line no-console
  console.log(activeCard);

  const handleMouseAction = (id: ActiveCard) => {
    setActiveCard(id);
  };

  return (
    <div className={'catalog__films-list'}>
      {films.map((film) => (
        <FilmCard
          film={film}
          key={film.id}
          onCardEnter={handleMouseAction}
          onCardLeave={handleMouseAction}
        />
      ))}
    </div>
  );
}

export default FilmsList;
