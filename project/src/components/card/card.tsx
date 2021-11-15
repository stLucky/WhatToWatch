import { Link } from 'react-router-dom';
import { memo, useRef } from 'react';
import cn from 'classnames';
import { FilmType } from '../../types/films';
import VideoPlayer from '../video-player/video-player';
import styles from './card.module.scss';
import { usePlayingVideo } from '../../hooks/use-playing-video';

type CardProps = {
  film: FilmType;
  hasPlayer: boolean;
};

function Card({ film, hasPlayer }: CardProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [handlePlayVideo, handleStopVideo] = usePlayingVideo(videoRef, timeRef);
  const linkClasses = cn('small-film-card catalog__films-card', styles.link);

  const getPreviewElement = () => {
    if (hasPlayer) {
      return (
        <VideoPlayer
          videoSrc={film.videoLink}
          posterSrc={film.previewImage}
          ref={videoRef}
        />
      );
    }

    return <img src={film.previewImage} alt={film.name} />;
  };

  return (
    <Link className={linkClasses} to={`/films/${film.id}`}>
      <article onMouseEnter={handlePlayVideo} onMouseLeave={handleStopVideo}>
        <div className="small-film-card__image">{getPreviewElement()}</div>
        <h3 className="small-film-card__title small-film-card__link">
          {film.name}
        </h3>
      </article>
    </Link>
  );
}

export default memo(Card);
