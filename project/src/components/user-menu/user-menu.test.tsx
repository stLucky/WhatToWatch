import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Router, Switch } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeAuthUser } from '../../mocks/user';
import { NameSpace } from '../../store/root-reducer';
import UserMenu from './user-menu';

const fakeUser = makeFakeAuthUser();

const history = createMemoryHistory();

const mockStore = configureMockStore();
const storeAuth = mockStore({
  [NameSpace.User]: {
    user: fakeUser,
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

const storeNoAuth = mockStore({
  [NameSpace.User]: {
    user: {},
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
});

storeAuth.dispatch = jest.fn();

describe('Component: UserMenu', () => {
  beforeEach(() => {
    history.push('');
  });

  it('should render correctly if authorizationStatus is Auth', () => {
    render(
      <Provider store={storeAuth}>
        <MemoryRouter>
          <UserMenu />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.getByRole('link', { name: `${fakeUser.name} avatar` }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign out/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /sign in/i })).toBeNull();
  });

  it('should render correctly if authorizationStatus is NoAuth', () => {
    render(
      <Provider store={storeNoAuth}>
        <MemoryRouter>
          <UserMenu />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.queryByRole('link', { name: `${fakeUser.name} avatar` }),
    ).toBeNull();
    expect(screen.queryByRole('link', { name: /sign out/i })).toBeNull();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should redirect to mylist page when authUser clicked to avatar', () => {
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.MyList} exact>
            <h1>This is mylist</h1>
          </Route>
          <Route>
            <Provider store={storeAuth}>
              <UserMenu />
            </Provider>
          </Route>
        </Switch>
      </Router>,
    );

    const linkMyList = screen.getByRole('link', {
      name: `${fakeUser.name} avatar`,
    });

    expect(linkMyList).toBeInTheDocument();
    expect(screen.queryByText(/this is mylist/i)).toBeNull();

    userEvent.click(linkMyList);

    expect(screen.getByText(/this is mylist/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: `${fakeUser.name} avatar` }),
    ).toBeNull();
  });

  it('should store dispatch when authUser clicked to logout', () => {
    render(
      <Provider store={storeAuth}>
        <MemoryRouter>
          <UserMenu />
        </MemoryRouter>
      </Provider>,
    );

    const linkLogOut = screen.getByRole('link', { name: /sign out/i });
    expect(linkLogOut).toBeInTheDocument();

    expect(storeAuth.dispatch).not.toBeCalled();

    userEvent.click(linkLogOut);

    expect(storeAuth.dispatch).toBeCalled();
  });

  it('should redirect to mylist page when noAuthUser clicked to sign-in', () => {
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Login} exact>
            <h1>This is sign in</h1>
          </Route>
          <Route>
            <Provider store={storeNoAuth}>
              <UserMenu />
            </Provider>
          </Route>
        </Switch>
      </Router>,
    );
    const linkSingIn = screen.getByRole('link', { name: /sign in/i });

    expect(linkSingIn).toBeInTheDocument();
    screen.debug();
    expect(screen.queryByText(/this is sign in/i)).toBeNull();

    userEvent.click(linkSingIn);

    expect(screen.getByText(/this is sign in/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /sign in/i })).toBeNull();
  });
});
