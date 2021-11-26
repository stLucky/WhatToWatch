import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Router, Switch } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../store/root-reducer';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { Store } from 'redux';
import SignInScreen from './sign-in-screen';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const mockStore = configureMockStore();
let store: Store;

describe('Component: MyListScreen', () => {
  it('should render correctly when user has not authorization', () => {
    store = mockStore({
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignInScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('heading', {name: /sign in/i})).toBeInTheDocument();
  });

  it('should redirect to root url when user has authorization', () => {
    store = mockStore({
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth },
    });

    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Provider store={store}>
              <SignInScreen />
            </Provider>
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: /sign in/i})).toBeNull();
  });
});
