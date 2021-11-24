import { render, screen } from '@testing-library/react';
import { Router, MemoryRouter, Switch, Route } from 'react-router-dom';
import Card from './card';
import userEvent from '@testing-library/user-event';
import { makeFakeFilm } from '../../mocks/films';
import { createMemoryHistory } from 'history';

const fakeFilm = makeFakeFilm();

const history = createMemoryHistory();

describe('Component: Card', () => {
  it('should render correctly when has player', () => {
    render(
      <MemoryRouter>
        <Card film={fakeFilm} hasPlayer />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(`${fakeFilm.name}`)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByAltText(`${fakeFilm.name}`)).toBeNull();
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });

  it('should render correctly when has not player', () => {
    render(
      <MemoryRouter>
        <Card film={fakeFilm} hasPlayer={false} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(`${fakeFilm.name}`)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByAltText(`${fakeFilm.name}`)).toBeInTheDocument();
    expect(screen.queryByTestId('video-player')).toBeNull();
  });

  it('should redirect to film page when user clicked to link', () => {
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path={`/films/${fakeFilm.id}`} exact>
            <h1>This is film</h1>
          </Route>
          <Route>
            <Card film={fakeFilm} hasPlayer />
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(/This is film/i)).not.toBeInTheDocument();
    expect(screen.getByText(`${fakeFilm.name}`)).toBeInTheDocument();

    userEvent.click(screen.getByRole('link'));

    expect(screen.queryByText(/This is film/i)).toBeInTheDocument();
    expect(screen.queryByText(`${fakeFilm.name}`)).toBeNull();
  });
});
