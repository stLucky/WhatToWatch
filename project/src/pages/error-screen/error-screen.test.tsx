import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Router, Switch } from 'react-router-dom';
import ErrorScreen from './error-screen';

const history = createMemoryHistory();

describe('Component: ErrorScreen', () => {
  it('should render correctly when type is not 404 error', () => {
    render(
      <MemoryRouter>
        <ErrorScreen />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/something went wrong. try again/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /reload page/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /go back to the main page/i }),
    ).toBeNull();
  });

  it('should render correctly when type is 404 error', () => {
    render(
      <MemoryRouter>
        <ErrorScreen type="404" />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/something went wrong. try again/i)).toBeNull();
    expect(screen.queryByRole('link', { name: /reload page/i })).toBeNull();

    expect(
      screen.getByRole('link', { name: /go back to the main page/i }),
    ).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link on 404 error page', () => {
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <ErrorScreen type="404" />
          </Route>
        </Switch>
      </Router>,
    );
    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    const link = screen.getByRole('link', {
      name: /go back to the main page/i,
    });
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });

  it('should refresh page when user clicked to link on other error page', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: jest.fn() },
    });

    window.location.reload = jest.fn();

    render(
      <MemoryRouter>
        <ErrorScreen />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: /reload page/i });
    expect(link).toBeInTheDocument();
    expect(window.location.reload).not.toBeCalled();

    userEvent.click(link);

    expect(window.location.reload).toBeCalled();
  });
});
