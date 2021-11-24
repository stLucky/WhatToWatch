import { useHistory, useParams } from 'react-router-dom';
import ErrorScreen from '../error-screen/error-screen';
import { useSelector } from 'react-redux';
import { getCurrentFilm, getFilms } from '../../store/films/selectors';
import { useEffect, useRef, useState, MouseEvent, useCallback } from 'react';
import Loader from 'react-loader-spinner';
import styles from './player-screen.module.scss';
import LoadingScreen from '../loading-screen/loading-screen';
import { getTimeFromSecs } from '../../utils';
import Progress from '../../components/progress/progress';
import Reload from '../../components/reload/reload';
import { MAX_VIDEO_PROGRESS } from '../../const';
import { State } from '../../types/state';

const INITIAL_PROGRESS = 0;

function PlayerScreen(): JSX.Element {
  const { id }: { id: string } = useParams();
  const history = useHistory();

  const films = useSelector(getFilms);
  const currentFilm = useSelector((state: State) => getCurrentFilm(state, id));

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadedMetaData, setIsLoadedMetaData] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [time, setTime] = useState('');
  const [progress, setProgress] = useState(INITIAL_PROGRESS);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlayClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsPlaying(true);

    isPlaying && setIsPlaying(false);
  };

  const handleFullClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    videoRef.current && videoRef.current.requestFullscreen();
  };

  const handleExitClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    isPlaying && setIsPlaying(false);
    history.goBack();
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const currentTime = getTimeFromSecs(
        Math.round(videoRef.current.duration),
      );

      setTime(currentTime);
      setIsLoadedMetaData(true);
    }
  };

  const handleLoadedData = () => {
    setIsPlaying(true);
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handlePlaying = () => {
    setIsLoading(false);
  };

  const handlePlay = () => {
    isPlaying === false && setIsPlaying(true);
  };

  const handlePause = () => {
    isPlaying === true && setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current !== null) {
      const currentTime = getTimeFromSecs(
        Math.round(videoRef.current.duration - videoRef.current.currentTime),
      );
      const currentProgress = Math.round(
        (videoRef.current.currentTime / videoRef.current.duration) *
          MAX_VIDEO_PROGRESS,
      );

      setTime(currentTime);
      setProgress(currentProgress);
    }
  };

  const handleChangeProgress = useCallback((currentProgress: number) => {
    setProgress(currentProgress);
  }, []);

  const handleChangeTime = useCallback((currentTime: string) => {
    setTime(currentTime);
  }, []);

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  const handleReloadClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setTime(getTimeFromSecs(Math.round(videoRef.current.duration)));
      setIsEnded(false);
      setIsPlaying(true);
    }
  };

  const isVisibleLoader = (isLoading && isPlaying) || (isLoading && !isPlaying);

  if (!films.length) {
    return <LoadingScreen />;
  }

  if (!currentFilm) {
    return <ErrorScreen />;
  }

  return (
    <div className="player">
      <div className={styles.loaderWrap}>
        <Loader
          type="Oval"
          color="#d9cd8d"
          height={50}
          width={50}
          visible={isVisibleLoader}
        />
        {isEnded && progress === MAX_VIDEO_PROGRESS && (
          <Reload
            className={styles.reload}
            height={60}
            width={60}
            color="#d9cd8d"
            onClick={handleReloadClick}
          />
        )}
      </div>
      <video
        src={currentFilm.videoLink}
        className="player__video"
        poster={currentFilm.posterImage}
        ref={videoRef}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onCanPlay={handlePlaying}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadedData={handleLoadedData}
        onEnded={handleEnded}
        onPlay={handlePlay}
        onPause={handlePause}
      />

      <button type="button" className="player__exit" onClick={handleExitClick}>
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <Progress
            progress={progress}
            time={time}
            onChangeProgress={handleChangeProgress}
            onChangeTime={handleChangeTime}
            video={videoRef.current}
            isLoadedMetaData={isLoadedMetaData}
          />
        </div>
        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={handlePlayClick}
          >
            {isPlaying ? (
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s" />
                </svg>
                <span>Play</span>
              </>
            )}
          </button>
          <button type="button" className="player__play" />
          <div className="player__name">{currentFilm.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={handleFullClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
