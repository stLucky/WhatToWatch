import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Breadcrumbs from './breadcrumbs';
import userEvent from '@testing-library/user-event';

const FILM_ID = 1;

const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Breadcrumbs filmName='film' id={FILM_ID}/>
      </Router>,
    );
    expect(screen.getByText('film')).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path={`/films/${FILM_ID}`} exact>
            <h1>This is film</h1>
          </Route>
          <Route>
            <Breadcrumbs filmName='film' id={FILM_ID}/>
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(/This is film/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is film/i)).toBeInTheDocument();
  });
});
