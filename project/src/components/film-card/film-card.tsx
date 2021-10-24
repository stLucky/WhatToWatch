import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Film } from '../../types/films';
import VideoPlayer from '../video-player/video-player';
import styles from './film-card.module.scss';

type FilmCardProps = {
  film: Film;
  hasPlayer: boolean;
};

const TIME_VIDEO_DELAY = 1000;

function FilmCard({ film, hasPlayer }: FilmCardProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const handleStopVideo = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      timeRef.current = setTimeout(
        () => videoRef.current?.play(),
        TIME_VIDEO_DELAY,
      );
    } else {
      videoRef.current.load();
    }

    return () => {
      timeRef.current && clearTimeout(timeRef.current);
    };
  }, [isPlaying]);

  return (
    <Link
      className={`small-film-card catalog__films-card ${styles.link}`}
      to={`/films/${film.id}`}
    >
      <article onMouseEnter={handlePlayVideo} onMouseLeave={handleStopVideo}>
        <div className="small-film-card__image">{getPreviewElement()}</div>
        <h3 className="small-film-card__title small-film-card__link">
          {film.name}
        </h3>
      </article>
    </Link>
  );
}

export default FilmCard;
