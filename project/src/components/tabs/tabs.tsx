import { useState } from 'react';
import { FilmType } from '../../types/films';
import { ReviewsType } from '../../types/reviews';
import Overview from '../overview/overview';
import Reviews from '../reviews/reviews';
import Details from '../details/details';
import styles from './tabs.module.scss';

type TabsProps = {
  currentFilm: FilmType;
  currentReviews: ReviewsType;
};

function Tabs({ currentFilm, currentReviews }: TabsProps): JSX.Element {
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

      {active === tabs[0] && <Overview currentFilm={currentFilm} />}

      {active === tabs[1] && <Details currentFilm={currentFilm} />}

      {active === tabs[2] && <Reviews currentReviews={currentReviews} />}
    </>
  );
}

export default Tabs;
