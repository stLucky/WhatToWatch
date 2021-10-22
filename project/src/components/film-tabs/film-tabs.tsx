import { useState, Fragment } from 'react';
import { Film } from '../../types/films';
import { getFormattedRating, getTimeFromMins } from '../../utils';
import FilmReview from '../review/film-review';
import { Reviews } from '../../types/reviews';
import styles from './film-tabs.module.scss';

type FilmTabsProps = {
  currentFilm: Film;
  currentReviews: Reviews;
};

function FilmTabs({ currentFilm, currentReviews }: FilmTabsProps): JSX.Element {
  const tabs = ['Overview', 'Details', 'Reviews'];

  const middleCurrentReviews = (Math.round(currentReviews.length / 2) - 1);

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
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
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

      {active === tabs[0] && (
        <>
          <div className="film-rating">
            <div className="film-rating__score">{currentFilm.rating}</div>
            <p className="film-rating__meta">
              <span className="film-rating__level">
                {getFormattedRating(currentFilm.rating)}
              </span>
              <span className="film-rating__count">
                {currentFilm.scoresCount} ratings
              </span>
            </p>
          </div>

          <div className="film-card__text">
            <p>{currentFilm.description}</p>

            <p className="film-card__director">
              <strong>Director: {currentFilm.director}</strong>
            </p>

            <p className="film-card__starring">
              <strong>{currentFilm.starring.join(', ')}</strong>
            </p>
          </div>
        </>
      )}

      {active === tabs[1] && (
        <div className="film-card__text film-card__row">
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value">
                {currentFilm.director}
              </span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              <span className="film-card__details-value">
                {currentFilm.starring.map((actor, i, actors) => {
                  if (i === actors.length - 1) {
                    return <Fragment key={actor}>{actor}</Fragment>;
                  }

                  return (
                    <Fragment key={actor}>
                      {actor}, <br />
                    </Fragment>
                  );
                })}
              </span>
            </p>
          </div>

          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">
                {getTimeFromMins(currentFilm.runTime, 'info')}
              </span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">
                {currentFilm.genre}
              </span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">
                {currentFilm.released}
              </span>
            </p>
          </div>
        </div>
      )}

      {active === tabs[2] && (
        <div className="film-card__reviews film-card__row">
          <div className="film-card__reviews-col">
            {currentReviews.map(
              (review, i) =>
                i <= middleCurrentReviews  && (
                  <FilmReview key={review.id} review={review} />
                ),
            )}
          </div>
          <div className="film-card__reviews-col">
            {currentReviews.map(
              (review, i) =>
                i > middleCurrentReviews && (
                  <FilmReview key={review.id} review={review} />
                ),
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FilmTabs;
