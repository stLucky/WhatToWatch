import { render, screen } from '@testing-library/react';
import VideoPlayer from './video-player';

describe('Component: VideoPlayer', () => {
  it('should render correctly', () => {
    render(<VideoPlayer videoSrc="fake" posterSrc="fake" />);
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });
});
