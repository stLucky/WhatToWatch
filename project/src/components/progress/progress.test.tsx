import { render, screen } from '@testing-library/react';
import Progress from './progress';
import userEvent from '@testing-library/user-event';

const progress = 60;
const time = '00:25';
const handleChangeProgress = jest.fn();
const handleChangeTime = jest.fn();

const video = {
  currentTime: 0,
  duration: 0,
} as HTMLVideoElement;

let isLoadedMetaData: boolean;

describe('Component: Progress', () => {
  isLoadedMetaData = false;

  it('should render correctly when isLoadedMetaData is false', () => {
    render(
      <Progress
        progress={progress}
        time={time}
        onChangeProgress={handleChangeProgress}
        onChangeTime={handleChangeTime}
        video={video}
        isLoadedMetaData={isLoadedMetaData}
      />,
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByTestId('video-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('video-time')).toHaveTextContent('00:00');
  });

  it('should render correctly when loadedmetadata is true', () => {
    isLoadedMetaData = true;
    render(
      <Progress
        progress={progress}
        time={time}
        onChangeProgress={handleChangeProgress}
        onChangeTime={handleChangeTime}
        video={video}
        isLoadedMetaData={isLoadedMetaData}
      />,
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByTestId('video-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('video-time')).toHaveTextContent(`${time}`);
  });

  it('callback\'s should be called when click on progress element', () => {
    render(
      <Progress
        progress={progress}
        time={time}
        onChangeProgress={handleChangeProgress}
        onChangeTime={handleChangeTime}
        video={video}
        isLoadedMetaData={isLoadedMetaData}
      />,
    );

    const progressElement = screen.getByRole('progressbar');

    expect(handleChangeProgress).not.toBeCalled();
    expect(handleChangeTime).not.toBeCalled();

    userEvent.click(progressElement);

    expect(handleChangeProgress).toBeCalled();
    expect(handleChangeTime).toBeCalled();
  });
});
