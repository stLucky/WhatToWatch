import { render, screen } from '@testing-library/react';
import { Router, Switch, Route, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Logo from './logo';
import userEvent from '@testing-library/user-event';

const LETTER_COUNT = 3;

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly if logo located in main page', () => {
    render(
      <MemoryRouter>
        <Logo onMain />
      </MemoryRouter>,
    );
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getAllByText(/^[TW]$/)).toHaveLength(LETTER_COUNT);
  });

  it('should render correctly if logo not located in main page', () => {
    render(
      <Router history={history}>
        <Logo onMain={false} />
      </Router>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getAllByText(/^[TW]$/)).toHaveLength(LETTER_COUNT);
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Logo onMain={false} />
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
