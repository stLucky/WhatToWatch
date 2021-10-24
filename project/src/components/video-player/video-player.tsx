import { forwardRef, ForwardedRef } from 'react';

type VideoPlayerProps = {
  videoSrc: string;
  posterSrc: string;
};

function Player(
  { videoSrc, posterSrc }: VideoPlayerProps,
  ref: ForwardedRef<HTMLVideoElement>,
): JSX.Element {
  return (
    <video
      src={videoSrc}
      poster={posterSrc}
      ref={ref}
      muted
      loop
      width="280"
      height="175"
    />
  );
}

const VideoPlayer = forwardRef(Player);

export default VideoPlayer;
