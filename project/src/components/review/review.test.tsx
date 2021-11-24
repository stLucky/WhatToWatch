import { render, screen } from '@testing-library/react';
import Review from './review';
import { makeFakeReview } from '../../mocks/reviews';
import { getFormattedDate } from '../../utils';

const fakeReview = makeFakeReview();

describe('Component: Review', () => {
  it('should render correctly', () => {
    render(<Review review={fakeReview} />);
    expect(screen.getByText(`${fakeReview.comment}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeReview.user.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeReview.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`${getFormattedDate(fakeReview.date)}`)).toBeInTheDocument();
  });
});
