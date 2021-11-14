import { Fragment } from 'react';
import { getTimeFromMins } from '../../utils';
import { FilmType } from '../../types/films';

type DetailsProps = {
  currentFilm: FilmType;
};

function Details({ currentFilm }: DetailsProps): JSX.Element {
  return (
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
            {getTimeFromMins(currentFilm.runTime)}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{currentFilm.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">
            {currentFilm.released}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Details;
