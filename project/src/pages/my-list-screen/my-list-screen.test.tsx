import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyListScreen from './my-list-screen';
import { makeFakeFilms } from '../../mocks/films';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../store/root-reducer';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { Store } from 'redux';

const fakeFilms = makeFakeFilms();
const fakeFilm = fakeFilms[0];

const mockStore = configureMockStore();
let store: Store;

describe('Component: MyListScreen', () => {
  it('should render correctly when has films and isMyListLoading is false and isMyListError is false', () => {
    store = mockStore({
      [NameSpace.Favorites]: { myList: fakeFilms, isMyListLoading: false, isMyListError: false},
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyListScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('heading', {name: `${fakeFilm.name}`})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /my list/i})).toBeInTheDocument();
    expect(screen.queryByText(/You have not added any movies yet/i)).toBeNull();
    expect(screen.queryByTestId('error-page')).toBeNull();
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  it('should render correctly when has not films and isMyListLoading is false and isMyListError is false', () => {
    store = mockStore({
      [NameSpace.Favorites]: { myList: [], isMyListLoading: false, isMyListError: false},
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyListScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('heading', {name: `${fakeFilm.name}`})).toBeNull();
    expect(screen.getByRole('heading', {name: /my list/i})).toBeInTheDocument();
    expect(screen.getByText(/You have not added any movies yet/i)).toBeInTheDocument();
    expect(screen.queryByTestId('error-page')).toBeNull();
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  it('should render correctly when isMyListLoading is true and isMyListError is false', () => {
    store = mockStore({
      [NameSpace.Favorites]: { myList: [], isMyListLoading: true, isMyListError: false},
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyListScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('heading', {name: `${fakeFilm.name}`})).toBeNull();
    expect(screen.queryByRole('heading', {name: /my list/i})).toBeNull();
    expect(screen.queryByTestId('error-page')).toBeNull();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should render correctly when isMyListLoading is false and isMyListError is true', () => {
    store = mockStore({
      [NameSpace.Favorites]: { myList: [], isMyListLoading: false, isMyListError: true},
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyListScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('heading', {name: `${fakeFilm.name}`})).toBeNull();
    expect(screen.queryByRole('heading', {name: /my list/i})).toBeNull();
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(screen.queryByTestId('loading')).toBeNull();
  });
});
