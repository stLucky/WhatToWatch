import { Link } from 'react-router-dom';
import {useState} from 'react';
import { Film } from '../../types/films';
import VideoPlayer from '../video-player/video-player';

type FilmCardProps = {
  film: Film
};

function FilmCard({
  film,
}: FilmCardProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    setIsPlaying(true);
  };

  const stopVideo = () => {
    setIsPlaying(false);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={playVideo}
      onMouseLeave={stopVideo}
    >
      <div className="small-film-card__image"  >
        <VideoPlayer videoSrc={film.videoLink} posterSrc={film.previewImage} isPlaying={isPlaying}/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
