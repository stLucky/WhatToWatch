import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_GENRE, MAX_NUMBER_GENRES } from '../../const';
import { makeFakeFilms } from '../../mocks/films';
import { NameSpace } from '../../store/root-reducer';
import { FilmsType, FilmType } from '../../types/films';
import Genres from './genres';

const fakeFilms = makeFakeFilms();

const getGenres = (films: FilmsType) => {
  const genres = [
    DEFAULT_GENRE,
    ...new Set(films.map((film: FilmType) => film.genre)),
  ];

  if (genres.length > MAX_NUMBER_GENRES) {
    genres.length = MAX_NUMBER_GENRES;
  }

  return genres;
};

const fakeGenres = getGenres(fakeFilms);

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.App]: { activeGenre: DEFAULT_GENRE },
});

store.dispatch = jest.fn();

describe('Component: Genres', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Genres genres={fakeGenres} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(fakeGenres.length);
    expect(screen.getByTestId('activeGenre')).toHaveClass(
      'catalog__genres-item--active',
    );
    expect(screen.getByText(`${fakeGenres[0]}`)).toBeInTheDocument();
  });

  it('should store dispatch to be called when change genre', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Genres genres={fakeGenres} />
        </MemoryRouter>
      </Provider>,
    );

    expect(store.dispatch).not.toBeCalled();

    const genre = screen.getByRole('link', { name: fakeGenres[0] });
    userEvent.click(genre);

    expect(store.dispatch).toBeCalled();
  });
});
