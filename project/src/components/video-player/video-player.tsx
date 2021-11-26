import { forwardRef, ForwardedRef } from 'react';

type VideoPlayerProps = {
  videoSrc: string;
  posterSrc: string;
};

function VideoPlayer(
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
      data-testid="video-player"
    />
  );
}

export default forwardRef(VideoPlayer);
