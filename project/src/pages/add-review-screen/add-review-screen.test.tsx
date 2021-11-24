import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddReviewScreen from './add-review-screen';
import { makeFakeFilm } from '../../mocks/films';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../store/root-reducer';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { Store } from 'redux';

const fakeFilm = makeFakeFilm();

const mockStore = configureMockStore();
let store: Store;

describe('Component: AddReviewScreen', () => {
  it('should render correctly when has film', () => {
    store = mockStore({
      [NameSpace.Film]: { film: fakeFilm },
      [NameSpace.Reviews]: { isSendReviewLoading: false },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isAuthLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddReviewScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.getAllByAltText(new RegExp(`${fakeFilm.name}`, 'i')),
    ).toHaveLength(2);
    expect(screen.getByRole('heading', { name: /wtw/i })).toBeInTheDocument();

    expect(screen.queryByTestId('error-page')).toBeNull();
  });

  it('should render correctly when has not film', () => {
    store = mockStore({
      [NameSpace.Film]: { film: {} },
      [NameSpace.Reviews]: { isSendReviewLoading: false },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isAuthLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddReviewScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.queryAllByAltText(new RegExp(`${fakeFilm.name}`, 'i')),
    ).toHaveLength(0);

    expect(screen.queryByRole('heading', { name: /wtw/i })).toBeNull();

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
  });
});
