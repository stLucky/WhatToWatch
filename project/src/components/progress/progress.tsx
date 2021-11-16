import cn from 'classnames';
import { memo, MouseEvent, useRef } from 'react';
import { MAX_VIDEO_PROGRESS } from '../../const';
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
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const progressClasses = cn('player__progress', styles.progress);

  const setTime = (currentProgress: number) => {
    if (!video) {
      return;
    }

    const currentTime = (video.duration * currentProgress) / MAX_VIDEO_PROGRESS;
    const reverseTime = Math.round(video.duration - currentTime);

    const formattedTime = getTimeFromSecs(reverseTime);
    onChangeTime(formattedTime);

    video.currentTime = currentTime;
  };

  const handleProgressClick = (evt: MouseEvent<HTMLProgressElement>) => {
    const target = evt.currentTarget;
    const leftOffset = target.getBoundingClientRect().left;
    const fullWidth = target.offsetWidth;

    const currentProgress = Math.round(
      ((evt.clientX - leftOffset) * MAX_VIDEO_PROGRESS) / fullWidth,
    );

    onChangeProgress(currentProgress);
    setTime(currentProgress);
  };

  const handletoggleMouseDown = (evt: MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();

    const target = evt.currentTarget;
    const leftOffset = target.getBoundingClientRect().left;
    const shiftX = evt.clientX - leftOffset;

    const onMouseMove = (e: { clientX: number }) => {
      if (!shiftX || !wrapRef.current || !toggleRef.current) {
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

      const currentPosition = (newLeft * MAX_VIDEO_PROGRESS) / wrapRef.current.offsetWidth;

      toggleRef.current.style.left = `${currentPosition}%`;

      onChangeProgress((newLeft * MAX_VIDEO_PROGRESS) / wrapRef.current.offsetWidth);
      if (video) {
        const currentTime = (video.duration * currentPosition) / MAX_VIDEO_PROGRESS;
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
          onMouseDown={handletoggleMouseDown}
          ref={toggleRef}
        >
          Toggle
        </div>
      </div>
      <div className="player__time-value">
        {isLoadedMetaData ? time : '00: 00'}
      </div>
    </>
  );
}

export default memo(Progress);
