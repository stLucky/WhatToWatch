import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Reviews from './reviews';
import { Provider } from 'react-redux';
import { NameSpace } from '../../store/root-reducer';
import { makeFakeReviews } from '../../mocks/reviews';
import { Store } from 'redux';
import { ANOTHER_TIME_ERROR } from '../../const';

const fakeReviews = makeFakeReviews();

const mockStore = configureMockStore();
let store: Store;

describe('Component: Reviews', () => {
  it('should render correctly when has reviews, isReviewsLoading is false and isReviewsError is false', () => {
    store = mockStore({
      [NameSpace.Reviews]: {
        reviews: fakeReviews,
        isReviewsLoading: false,
        isReviewsError: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Reviews />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId('review')).toHaveLength(fakeReviews.length);

    expect(screen.queryByText(/so far, no one has left a review/i)).toBeNull();
    expect(screen.queryByText(`${ANOTHER_TIME_ERROR}`)).toBeNull();
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  it('should render correctly when has reviews, isReviewsLoading is true and isReviewsError is false', () => {
    store = mockStore({
      [NameSpace.Reviews]: {
        reviews: fakeReviews,
        isReviewsLoading: true,
        isReviewsError: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Reviews />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    expect(screen.queryAllByTestId('review')).toHaveLength(0);
    expect(screen.queryByText(/so far, no one has left a review/i)).toBeNull();
    expect(screen.queryByText(`${ANOTHER_TIME_ERROR}`)).toBeNull();
  });

  it('should render correctly when has reviews, isReviewsLoading is false and isReviewsError is true', () => {
    store = mockStore({
      [NameSpace.Reviews]: {
        reviews: fakeReviews,
        isReviewsLoading: false,
        isReviewsError: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Reviews />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(`${ANOTHER_TIME_ERROR}`)).toBeInTheDocument();

    expect(screen.queryAllByTestId('review')).toHaveLength(0);
    expect(screen.queryByText(/so far, no one has left a review/i)).toBeNull();
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  it('should render correctly when has not reviews, isReviewsLoading is false and isReviewsError is false', () => {
    store = mockStore({
      [NameSpace.Reviews]: {
        reviews: [],
        isReviewsLoading: false,
        isReviewsError: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Reviews />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.queryByText(/so far, no one has left a review/i)).toBeInTheDocument();

    expect(screen.queryAllByTestId('review')).toHaveLength(0);
    expect(screen.queryByTestId('loader')).toBeNull();
    expect(screen.queryByText(`${ANOTHER_TIME_ERROR}`)).toBeNull();
  });
});
