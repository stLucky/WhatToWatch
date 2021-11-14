import { useState, useEffect, MutableRefObject } from 'react';

const TIME_VIDEO_DELAY = 1000;

type ResultPlayingVideo = [() => void, () => void];

export const usePlayingVideo = (
  video: MutableRefObject<HTMLVideoElement | null>,
  timer: MutableRefObject<ReturnType<typeof setTimeout> | null>,
): ResultPlayingVideo => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const handleStopVideo = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (video.current === null) {
      return;
    }

    if (isPlaying) {
      timer.current = setTimeout(() => video.current?.play(), TIME_VIDEO_DELAY);
    } else {
      video.current.load();
    }

    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [isPlaying, timer, video]);

  return [handlePlayVideo, handleStopVideo];
};
