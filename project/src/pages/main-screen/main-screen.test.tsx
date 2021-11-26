import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainScreen from './main-screen';
import { makeFakeFilms } from '../../mocks/films';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../store/root-reducer';
import { Provider } from 'react-redux';
import {
  AuthorizationStatus,
  DEFAULT_GENRE,
  SHOWN_COUNT_FILMS
} from '../../const';
import { Store } from 'redux';

const fakeFilms = makeFakeFilms();
const fakeFilm = fakeFilms[0];

const mockStore = configureMockStore();
let store: Store;

describe('Component: MainScreen', () => {
  it('should render correctly when isFilmsLoading and isPromoLoading is false and isFilmsError is false', () => {
    store = mockStore({
      [NameSpace.Films]: {
        films: fakeFilms,
        isFilmsLoading: false,
        isFilmsError: false,
      },
      [NameSpace.Film]: { films: fakeFilm, isFilmLoading: false },
      [NameSpace.Promo]: { promo: fakeFilm, isPromoLoading: false },
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.App]: { activeGenre: DEFAULT_GENRE, limit: SHOWN_COUNT_FILMS },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.getByRole('heading', { name: /catalog/i }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('error-page')).toBeNull();
    expect(screen.queryByTestId('loading')).toBeNull();
    expect(
      screen.getByRole('button', { name: /show more/i }),
    ).toBeInTheDocument();
  });

  it('should render correctly when isFilmsLoading and isPromoLoading is true and isFilmsError is false', () => {
    store = mockStore({
      [NameSpace.Films]: {
        films: fakeFilms,
        isFilmsLoading: true,
        isFilmsError: false,
      },
      [NameSpace.Film]: { films: fakeFilm, isFilmLoading: false },
      [NameSpace.Promo]: { promo: fakeFilm, isPromoLoading: true },
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.App]: { activeGenre: DEFAULT_GENRE, limit: SHOWN_COUNT_FILMS },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('heading', { name: /catalog/i })).toBeNull();
    expect(screen.queryByTestId('error-page')).toBeNull();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should render correctly when isFilmsLoading and isPromoLoading is false and isFilmsError is true', () => {
    store = mockStore({
      [NameSpace.Films]: {
        films: fakeFilms,
        isFilmsLoading: false,
        isFilmsError: true,
      },
      [NameSpace.Film]: { films: fakeFilm, isFilmLoading: false },
      [NameSpace.Promo]: { promo: fakeFilm, isPromoLoading: false },
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.App]: { activeGenre: DEFAULT_GENRE, limit: SHOWN_COUNT_FILMS },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('heading', { name: /catalog/i })).toBeNull();
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(screen.queryByTestId('loading')).toBeNull();
  });
});
