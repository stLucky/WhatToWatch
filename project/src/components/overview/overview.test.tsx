import { render, screen } from '@testing-library/react';
import Overview from './overview';
import { makeFakeFilm } from '../../mocks/films';

const fakeFilm = makeFakeFilm();

describe('Component: Overview', () => {
  it('should render correctly', () => {
    render(<Overview currentFilm={fakeFilm} />);
    expect(screen.getByText(`${fakeFilm.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeFilm.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeFilm.description}`)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${fakeFilm.director}`)).toBeInTheDocument();
  });
});
