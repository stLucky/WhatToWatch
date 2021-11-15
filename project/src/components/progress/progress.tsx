import cn from 'classnames';
import { MouseEvent, useRef } from 'react';
import { getTimeFromSecs } from '../../utils';
import styles from './progress.module.scss';

type ProgressProps = {
  progress: number;
  time: string;
  onChangeProgress: (progress: number) => void;
  onChangeTime: (time: string) => void;
  video: HTMLVideoElement | null;
  isLoadedMetaData: boolean;
};

function Progress({
  progress,
  time,
  onChangeProgress,
  onChangeTime,
  video,
  isLoadedMetaData,
}: ProgressProps): JSX.Element {
  const togglerRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const progressClasses = cn('player__progress', styles.progress);

  const setTime = (currentProgress: number) => {
    if (!video) {
      return;
    }

    const currentTime = (video.duration * currentProgress) / 100;
    const reverseTime = Math.round(video.duration - currentTime);

    const formattedTime = getTimeFromSecs(reverseTime);
    onChangeTime(formattedTime);

    video.currentTime = currentTime;
  };

  const handleProgressClick = (evt: MouseEvent) => {
    const target = evt.target as HTMLProgressElement;
    const leftOffset = target.getBoundingClientRect().left;
    const fullWidth = target.offsetWidth;

    const currentProgress = Math.round(
      ((evt.clientX - leftOffset) * 100) / fullWidth,
    );

    onChangeProgress(currentProgress);
    setTime(currentProgress);
  };

  const handleTogglerMouseDown = (evt: MouseEvent) => {
    evt.preventDefault();

    const target = evt.target as HTMLDivElement;
    const leftOffset = target.getBoundingClientRect().left;
    const shiftX = evt.clientX - leftOffset;

    const onMouseMove = (e: { clientX: number }) => {
      if (!shiftX || !wrapRef.current || !togglerRef.current) {
        return;
      }

      const wrapLeftOffset = wrapRef.current.getBoundingClientRect().left;
      let newLeft = e.clientX - shiftX - wrapLeftOffset;

      if (newLeft < 0) {
        newLeft = 0;
      }

      const rightEdge = wrapRef.current.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      const currentPosition = (newLeft * 100) / wrapRef.current.offsetWidth;

      togglerRef.current.style.left = `${currentPosition}%`;

      onChangeProgress((newLeft * 100) / wrapRef.current.offsetWidth);
      if (video) {
        const currentTime = (video.duration * currentPosition) / 100;
        video.currentTime = currentTime;

        onChangeTime(getTimeFromSecs(Math.round(video.duration - currentTime)));
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <>
      <div className="player__time" ref={wrapRef}>
        <progress
          className={progressClasses}
          value={progress}
          max="100"
          onClick={handleProgressClick}
        />
        <div
          className="player__toggler"
          style={{ left: `${progress}%` }}
          onMouseDown={handleTogglerMouseDown}
          ref={togglerRef}
        >
          Toggler
        </div>
      </div>
      <div className="player__time-value">
        {isLoadedMetaData ? time : '00: 00'}
      </div>
    </>
  );
}

export default Progress;
