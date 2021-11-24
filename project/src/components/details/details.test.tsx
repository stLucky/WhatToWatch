import { render, screen } from '@testing-library/react';
import Details from './details';
import { makeFakeFilm } from '../../mocks/films';

const fakeFilm = makeFakeFilm();

describe('Component: Details', () => {
  it('should render correctly', () => {
    render(<Details currentFilm={fakeFilm} />);
    expect(screen.getByText(`${fakeFilm.director}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeFilm.genre}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeFilm.released}`)).toBeInTheDocument();
  });
});
