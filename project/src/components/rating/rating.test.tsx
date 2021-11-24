import { render, screen } from '@testing-library/react';
import Rating from './rating';
import userEvent from '@testing-library/user-event';

const rating = 5;
const handleChange = jest.fn();
let checkedRating = rating;

describe('Component: Rating', () => {
  it('should render correctly if rating is checked', () => {
    render(
      <Rating rating={rating} checked={checkedRating} onChange={handleChange} />,
    );

    const radio = screen.getByRole('radio');

    expect(radio).toBeInTheDocument();
    expect(radio).toBeChecked();
    expect(screen.getByText(`Rating ${checkedRating}`)).toBeInTheDocument();
  });

  it('should render correctly if rating is not checked', () => {
    checkedRating = 10;

    render(
      <Rating rating={rating} checked={checkedRating} onChange={handleChange} />,
    );
    const radio = screen.getByRole('radio');

    expect(radio).toBeInTheDocument();
    expect(radio).not.toBeChecked();
    expect(screen.getByText(`Rating ${rating}`)).toBeInTheDocument();
  });

  it('should be called callback when change rating', () => {
    checkedRating = 10;

    render(
      <Rating rating={rating} checked={checkedRating} onChange={handleChange} />,
    );

    const radio = screen.getByRole('radio');

    expect(handleChange).not.toBeCalled();
    userEvent.click(radio);
    expect(handleChange).toBeCalled();
  });
});
