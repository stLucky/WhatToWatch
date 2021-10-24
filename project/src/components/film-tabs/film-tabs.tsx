import { useState } from 'react';
import { Film } from '../../types/films';
import { Reviews } from '../../types/reviews';
import FilmOverview from '../film-overview/film-overview';
import FilmReviews from '../film-reviews/film-reviews';
import FilmDetails from '../film-details/film-details';
import styles from './film-tabs.module.scss';

type FilmTabsProps = {
  currentFilm: Film;
  currentReviews: Reviews;
};

function FilmTabs({ currentFilm, currentReviews }: FilmTabsProps): JSX.Element {
  const tabs = ['Overview', 'Details', 'Reviews'];

  const [active, setActive] = useState(tabs[0]);

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabs.map((tab) => (
            <li
              className={`film-nav__item ${
                tab === active && 'film-nav__item--active'
              }`}
              key={tab}
            >
              <button
                className={`film-nav__link ${styles.resetButton}`}
                type="button"
                onClick={() => setActive(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {active === tabs[0] && <FilmOverview currentFilm={currentFilm} />}

      {active === tabs[1] && <FilmDetails currentFilm={currentFilm} />}

      {active === tabs[2] && <FilmReviews currentReviews={currentReviews} />}
    </>
  );
}

export default FilmTabs;
