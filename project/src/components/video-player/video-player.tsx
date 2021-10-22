import {useRef, useEffect} from 'react';

type VideoPlayerProps = {
  videoSrc: string;
  posterSrc: string;
  isPlaying: boolean;
};

const TIME_DELAY_PLAYING_VIDEO = 1000;

function VideoPlayer({ videoSrc, posterSrc , isPlaying}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    let timerId: ReturnType<typeof setTimeout>;

    if (isPlaying) {
      timerId =  setTimeout(() => {
        videoRef.current?.play();
      }, TIME_DELAY_PLAYING_VIDEO);
    } else {
      videoRef.current.load();
    }

    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [isPlaying]);

  return (
    <video
      src={videoSrc}
      poster={posterSrc}
      ref={videoRef}
      muted
      loop
      width="280"
      height="175"
    />
  );
}

export default VideoPlayer;
