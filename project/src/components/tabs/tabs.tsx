import { useState } from 'react';
import cn from 'classnames';
import { FilmType } from '../../types/films';
import Overview from '../overview/overview';
import Details from '../details/details';
import styles from './tabs.module.scss';
import Reviews from '../reviews/reviews';

type TabsProps = {
  currentFilm: FilmType;
};

function Tabs({ currentFilm }: TabsProps): JSX.Element {
  const tabs = ['Overview', 'Details', 'Reviews'];

  const [active, setActive] = useState(tabs[0]);

  const tabClasses = (tab: string) =>
    cn('film-nav__item', { 'film-nav__item--active': tab === active });

  const btnClasses = cn('film-nav__link', styles.resetButton);

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabs.map((tab) => (
            <li className={tabClasses(tab)} key={tab}>
              <button
                className={btnClasses}
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

      {active === tabs[2] && <Reviews />}
    </>
  );
}

export default Tabs;
