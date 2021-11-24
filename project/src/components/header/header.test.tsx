import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Store } from 'redux';
import { AuthorizationStatus } from '../../const';
import { makeFakeAuthUser } from '../../mocks/user';
import { NameSpace } from '../../store/root-reducer';
import Header from './header';

const fakeUser = makeFakeAuthUser();

const mockStore = configureMockStore();
let store: Store;

describe('Component: Header', () => {
  it('should render correctly if not located on main page and user is authorized', () => {
    store = mockStore({
      [NameSpace.User]: {
        user: fakeUser,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /sign in/i })).toBeNull();
    expect(screen.getByRole('link', { name: /w t w/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign out/i })).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeUser.name} avatar`)).toBeInTheDocument();
  });

  it('should render correctly if located on main page and user is authorized', () => {
    store = mockStore({
      [NameSpace.User]: {
        user: fakeUser,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header onMain />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /sign in/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /w t w/i })).toBeNull();
    expect(screen.getByRole('link', { name: /sign out/i })).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeUser.name} avatar`)).toBeInTheDocument();
  });

  it('should render correctly if located on main page and user is not authorized', () => {
    store = mockStore({
      [NameSpace.User]: {
        user: {},
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header onMain />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /w t w/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /sign out/i })).toBeNull();
    expect(screen.queryByAltText(`${fakeUser.name} avatar`)).toBeNull();
  });

  it('should render correctly if not located on main page and user is not authorized', () => {
    store = mockStore({
      [NameSpace.User]: {
        user: {},
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /w t w/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /sign out/i })).toBeNull();
    expect(screen.queryByAltText(`${fakeUser.name} avatar`)).toBeNull();
  });
});
