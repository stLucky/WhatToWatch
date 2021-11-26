import {renderHook, act} from '@testing-library/react-hooks';
import { MutableRefObject } from 'react';
import {usePlayingVideo} from './use-playing-video';

const videoRef = {
  current: {},
} as MutableRefObject<HTMLVideoElement>;
videoRef.current.load = jest.fn();
const timerRef = {} as MutableRefObject<ReturnType<typeof setTimeout>>;

describe('Hook: usePlayingVideo', () => {
  it('should return array with 2 elements', () => {

    const {result} = renderHook(() =>
      usePlayingVideo(videoRef, timerRef),
    );

    const [handlePlayVideo, handleStopVideo] = result.current;

    expect(result.current).toHaveLength(2);
    expect(handlePlayVideo).toBeInstanceOf(Function);
    expect(handleStopVideo).toBeInstanceOf(Function);
  });
});
