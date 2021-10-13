import { Films, Film } from '../types/films';
import { useParams } from 'react-router-dom';
import { getTimeFromMins } from '../utils';

type PlayerScreenProps = {
  films: Films
};

function PlayerScreen({films}: PlayerScreenProps): JSX.Element {
  const { id }: {id: string}= useParams();

  const currentFilm: Film | undefined = films.find((film) => film.id === +id);

  return (
    <div className="player">
      <video
        src="#"
        className="player__video"
        poster={currentFilm?.posterImage}
      >
      </video>

      <button type="button" className="player__exit">
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value="30"
              max="100"
            >
            </progress>
            <div className="player__toggler" style={{ left: '30%' }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">{getTimeFromMins(currentFilm?.runTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{currentFilm?.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
