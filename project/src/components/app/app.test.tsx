import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus, DEFAULT_GENRE } from '../../const';
import App from './app';
import { makeFakeFilms } from '../../mocks/films';
import { NameSpace } from '../../store/root-reducer';

const mockStore = configureMockStore();
const films = makeFakeFilms();
const fakeFilm = films[0];
const fakeId = fakeFilm.id;

type UserTypes = 'auth' | 'no-auth';

const getState = (type: UserTypes) => ({
  [NameSpace.Films]: { films: films },
  [NameSpace.Film]: { film: fakeFilm },
  [NameSpace.Promo]: { promo: fakeFilm },
  [NameSpace.SimilarFilms]: { similar: [] },
  [NameSpace.Favorites]: { myList: [] },
  [NameSpace.Reviews]: { reviews: [] },
  [NameSpace.App]: { activeGenre: DEFAULT_GENRE },
  [NameSpace.User]: {
    user: {},
    authorizationStatus:
      type === 'auth' ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth,
  },
});

const makeMockStore = (type: UserTypes) => mockStore(getState(type));
const authStore = makeMockStore('auth');
const noAuthStore = makeMockStore('no-auth');

const history = createMemoryHistory();

const fakeAuthApp = (
  <Provider store={authStore}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

const fakeNoAuthApp = (
  <Provider store={noAuthStore}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

authStore.dispatch = jest.fn();
noAuthStore.dispatch = jest.fn();

describe('Application Routing', () => {
  beforeEach(() => {
    history.push('');
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeAuthApp);

    expect(screen.getByText(`${DEFAULT_GENRE}`)).toBeInTheDocument();
  });

  it('should render "MainScreen" when auth user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeAuthApp);

    expect(screen.getByText(`${DEFAULT_GENRE}`)).toBeInTheDocument();
  });

  it('should render "SignInScreen" when noAuth user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeNoAuthApp);

    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('should render "MyListScreen" when auth user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);
    render(fakeAuthApp);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render "SignInScreen" when noAuth user navigate to "/mylist"', () => {
    history.push(AppRoute.Login);
    render(fakeNoAuthApp);

    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('should render "MovieScreen" when user navigate to "/films/:id"', () => {
    history.push(AppRoute.Film);
    render(fakeAuthApp);

    expect(screen.getByText(/overview/i)).toBeInTheDocument();
    expect(screen.getByText(/details/i)).toBeInTheDocument();
    expect(screen.getByText(/reviews/i)).toBeInTheDocument();
  });

  it('should render "AddReviewScreen" when auth user navigate to "/films/:id/review"', () => {
    history.push(`/films/${fakeId}/review`);
    render(fakeAuthApp);

    expect(screen.getByPlaceholderText(/review text/i)).toBeInTheDocument();
    expect(screen.getByText(/post/i)).toBeInTheDocument();
  });

  it('should render "SignInScreen" when noAuth user navigate to "/films/:id/review"', () => {
    history.push(`/films/${fakeId}/review`);
    render(fakeNoAuthApp);

    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('should render "PlayerScreen" when user navigate to "/player/:id"', () => {
    history.push(`/player/${fakeId}`);
    render(fakeAuthApp);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should render "ErrorScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeAuthApp);

    expect(screen.getByText(/404 not found/i)).toBeInTheDocument();
    expect(screen.getByText(/go back to the main page/i)).toBeInTheDocument();
  });
});
