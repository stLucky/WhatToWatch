import { render, screen } from '@testing-library/react';
import Tabs from './tabs';
import { makeFakeFilm } from '../../mocks/films';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../store/root-reducer';
import { makeFakeReviews } from '../../mocks/reviews';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

const tabs = ['Overview', 'Details', 'Reviews'];

const fakeFilm = makeFakeFilm();
const fakeReviews = makeFakeReviews();

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Reviews]: {
    reviews: fakeReviews,
    isReviewsLoading: false,
    isReviewsError: false,
  },
});

describe('Component: Tabs', () => {
  it('should render correctly when active initial tab', () => {
    render(<Tabs currentFilm={fakeFilm} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(tabs.length);
    expect(screen.getByText(`${fakeFilm.rating}`)).toBeInTheDocument();
    expect(screen.queryByText(`${fakeFilm.released}`)).toBeNull();
  });

  it('should render correctly when active Details tab', () => {
    render(<Tabs currentFilm={fakeFilm} />);

    const detailsBtn = screen.getByRole('button', { name: tabs[1] });

    userEvent.click(detailsBtn);

    expect(screen.queryByText(`${fakeFilm.rating}`)).toBeNull();
    expect(screen.getByText(`${fakeFilm.released}`)).toBeInTheDocument();
  });

  it('should render correctly when active Reviews tab', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Tabs currentFilm={fakeFilm} />
        </MemoryRouter>
      </Provider>,
    );

    const reviewsBtn = screen.getByRole('button', { name: tabs[2] });

    userEvent.click(reviewsBtn);

    expect(screen.queryByText(`${fakeFilm.rating}`)).toBeNull();
    expect(screen.queryByText(`${fakeFilm.released}`)).toBeNull();
    expect(screen.queryAllByTestId('review')).toHaveLength(fakeReviews.length);
  });
});
