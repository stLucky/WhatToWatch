import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Reload from './reload';

const width = 60;
const height = 60;
const color = 'd9cd8d';
const handleReloadClick = jest.fn();

describe('Component: Reload', () => {
  it('should render correctly and should be called callback when click on reload', () => {
    render(
      <Reload
        width={width}
        height={height}
        color={color}
        onClick={handleReloadClick}
      />,
    );
    const reload = screen.getByTestId('reload');

    expect(handleReloadClick).not.toBeCalled();
    expect(reload).toBeInTheDocument();
    userEvent.click(reload);
    expect(handleReloadClick).toBeCalled();
  });
});
