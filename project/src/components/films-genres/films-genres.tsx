import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { MouseEvent } from 'react';
import { Actions } from '../../types/action';
import { State } from '../../types/state';
import { changeGenre, getFilms } from '../../store/action';
import { Films } from '../../types/films';
import { getFilteredFilms } from '../../films';

type FilmsGenresProps = {
  genres: string[];
};

const mapStateToProps = ({ genre: genreState }: State) => ({
  genreState,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeGenre(genre: string, films: Films) {
    dispatch(changeGenre(genre));
    // вот тут диспатчу два действия. Можно ли диспатчить только changeGenre(genre),
    // чтобы при этом автоматически обновлялось поле в стейте с фильмами?
    dispatch(getFilms(films));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FilmsGenresProps;

function FilmsGenres({
  genres,
  genreState,
  onChangeGenre,
}: ConnectedComponentProps): JSX.Element {
  const handleGenreClick = (
    evt: MouseEvent<HTMLAnchorElement>,
    genre: string,
  ) => {
    evt.preventDefault();

    onChangeGenre(genre, getFilteredFilms(genre));
  };

  const getClassesGenre = (genre: string) => {
    if (genre === genreState) {
      return 'catalog__genres-item catalog__genres-item--active';
    }

    return 'catalog__genres-item';
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li className={getClassesGenre(genre)} key={genre}>
          <a
            href="/"
            className="catalog__genres-link"
            onClick={(evt) => handleGenreClick(evt, genre)}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export { FilmsGenres };

export default connector(FilmsGenres);
