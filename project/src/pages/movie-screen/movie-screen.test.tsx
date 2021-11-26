import { render, screen } from '@testing-library/react';
import ReactRouter from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import MovieScreen from './movie-screen';
import { makeFakeFilm, makeFakeFilms } from '../../mocks/films';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../store/root-reducer';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { Store } from 'redux';

const fakeFilm = makeFakeFilm();
const fakeId = fakeFilm.id.toString();
const fakeFilms = makeFakeFilms();

const mockStore = configureMockStore();
let store: Store;

describe('Component: MovieScreen', () => {
  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: fakeId });
  });

  it('should render correctly when isFilmLoading is false and isFilmError is empty', () => {
    store = mockStore({
      [NameSpace.Film]: { film: fakeFilm, isFilmLoading: false, filmError: ''},
      [NameSpace.Promo]: { promo: fakeFilm, isPromoLoading: false },
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.SimilarFilms]: {similar: fakeFilms, isSimilarLoading: false, isSimilarError: false },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('heading', {name: /wtw/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /more like this/i})).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeFilm.name}`)).toBeInTheDocument();
    expect(screen.queryByTestId('error-page')).toBeNull();
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  it('should render correctly when isFilmLoading is true and isFilmError is empty', () => {
    store = mockStore({
      [NameSpace.Film]: { film: fakeFilm, isFilmLoading: true, filmError: ''},
      [NameSpace.Promo]: { promo: fakeFilm, isPromoLoading: false },
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.SimilarFilms]: {similar: fakeFilms, isSimilarLoading: false, isSimilarError: false },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('heading', {name: /wtw/i})).toBeNull();
    expect(screen.queryByRole('heading', {name: /more like this/i})).toBeNull();
    expect(screen.queryByAltText(`${fakeFilm.name}`)).toBeNull();
    expect(screen.queryByTestId('error-page')).toBeNull();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should render correctly when isFilmLoading is false and isFilmError is 404', () => {
    store = mockStore({
      [NameSpace.Film]: { film: fakeFilm, isFilmLoading: false, filmError: '404'},
      [NameSpace.Promo]: { promo: fakeFilm, isPromoLoading: false },
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.SimilarFilms]: {similar: fakeFilms, isSimilarLoading: false, isSimilarError: false },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('heading', {name: /wtw/i})).toBeNull();
    expect(screen.queryByRole('heading', {name: /more like this/i})).toBeNull();
    expect(screen.queryByAltText(`${fakeFilm.name}`)).toBeNull();
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /404 Not Found/i})).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: /Oops... Something went wrong. Try again/i})).toBeNull();
    expect(screen.queryByTestId('loading')).toBeNull();
  });


  it('should render correctly when isFilmLoading is false and isFilmError is other', () => {
    store = mockStore({
      [NameSpace.Film]: { film: fakeFilm, isFilmLoading: false, filmError: 'OTHER'},
      [NameSpace.Promo]: { promo: fakeFilm, isPromoLoading: false },
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.SimilarFilms]: {similar: fakeFilms, isSimilarLoading: false, isSimilarError: false },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('heading', {name: /wtw/i})).toBeNull();
    expect(screen.queryByRole('heading', {name: /more like this/i})).toBeNull();
    expect(screen.queryByAltText(`${fakeFilm.name}`)).toBeNull();
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: /404 Not Found/i})).toBeNull();
    expect(screen.getByRole('link', {name: /Oops... Something went wrong. Try again/i})).toBeInTheDocument();
    expect(screen.queryByTestId('loading')).toBeNull();
  });

});
