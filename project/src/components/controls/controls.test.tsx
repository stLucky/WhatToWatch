import { render, screen } from '@testing-library/react';
import { Router, MemoryRouter, Switch, Route } from 'react-router-dom';
import Controls from './controls';
import userEvent from '@testing-library/user-event';
import ReactRouter from 'react-router';
import { makeFakeFilm } from '../../mocks/films';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../store/root-reducer';
import { AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';
import { Store } from 'redux';

const film = makeFakeFilm();
const fakeId = film.id.toString();

const fakeFavoriteFilm = { ...film, isFavorite: true };
const fakeFilm = { ...film, isFavorite: false };

const history = createMemoryHistory();

const mockStore = configureMockStore();
let store: Store;

describe('Component: Controls', () => {
  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: fakeId });
  });

  it('should render correctly when has review control props and user is authorized', () => {
    store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Promo]: { promo: {} },
      [NameSpace.Film]: { film: {} },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Controls hasReviewControl />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /my list/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /add review/i })).toBeInTheDocument();
  });

  it('should render correctly when has not review control props and user is authorized', () => {
    store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Promo]: { promo: {} },
      [NameSpace.Film]: { film: {} },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Controls />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /my list/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /add review/i })).toBeNull();
  });

  it('should render correctly when has review control props and user is not authorized', () => {
    store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.Promo]: { promo: {} },
      [NameSpace.Film]: { film: {} },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Controls hasReviewControl />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /my list/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /add review/i })).toBeNull();
  });

  it('should render correctly when film is favorite', () => {
    store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Promo]: { promo: {} },
      [NameSpace.Film]: { film: fakeFavoriteFilm },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Controls hasReviewControl />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /my list/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /add review/i })).toBeInTheDocument();
    expect(screen.getByTestId('in-list')).toBeInTheDocument();
    expect(screen.queryByTestId('add')).toBeNull();
  });

  it('should render correctly when film is not favorite', () => {
    store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Promo]: { promo: {} },
      [NameSpace.Film]: { film: fakeFilm },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Controls hasReviewControl />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /my list/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /add review/i })).toBeInTheDocument();
    expect(screen.queryByTestId('in-list')).toBeNull();
    expect(screen.getByTestId('add')).toBeInTheDocument();
  });

  it('should redirect to add review page when user clicked to link add review', () => {
    store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Promo]: { promo: {} },
      [NameSpace.Film]: { film: { fakeFilm } },
    });

    history.push('/fake');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`/films/${fakeId}/review`} exact>
              <h1>This is add review page</h1>
            </Route>
            <Route>
              <Controls hasReviewControl />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    const reviewLink = screen.getByRole('link', { name: /add review/i });

    expect(screen.queryByText(/This is add review page/i)).not.toBeInTheDocument();
    expect(reviewLink).toBeInTheDocument();

    userEvent.click(reviewLink);

    expect(screen.getByText(/This is add review page/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /add review/i })).toBeNull();
  });

  it('should redirect to player page when user clicked to button play', () => {
    store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Promo]: { promo: {} },
      [NameSpace.Film]: { film: { fakeFilm } },
    });

    history.push('/fake');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`/player/${fakeId}`} exact>
              <h1>This is player</h1>
            </Route>
            <Route>
              <Controls />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    const playBtn = screen.getByRole('button', { name: /play/i });

    expect(screen.queryByText(/This is player/i)).not.toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();

    userEvent.click(playBtn);

    expect(screen.getByText(/This is player/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /play/i })).toBeNull();
  });

  it('should store dispatch to be called when user clicked to button my list', () => {
    store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Promo]: { promo: {} },
      [NameSpace.Film]: { film: fakeFilm },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Controls hasReviewControl />
        </MemoryRouter>
      </Provider>,
    );

    const playBtn = screen.getByRole('button', { name: /my list/i });
    expect(playBtn).toBeInTheDocument();

    expect(store.dispatch).not.toBeCalled();

    userEvent.click(playBtn);

    expect(store.dispatch).toBeCalled();
  });
});
