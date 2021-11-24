import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Films from './films';
import { makeFakeFilms } from '../../mocks/films';

const fakeFilms = makeFakeFilms();

describe('Component: Films', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Films films={fakeFilms} hasPlayer />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(fakeFilms.length);
    expect(screen.getByText(`${fakeFilms[0].name}`)).toBeInTheDocument();
  });
});
