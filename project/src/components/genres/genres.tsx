import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { MouseEvent } from 'react';
import cn from 'classnames';
import { Actions } from '../../types/actions';
import { State } from '../../types/state';
import { changeActiveGenre, resetLimit } from '../../store/actions';

type GenresProps = {
  genres: string[];
};

const mapStateToProps = ({ activeGenre: genreState }: State) => ({
  genreState,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeGenre(genre: string) {
    dispatch(changeActiveGenre(genre));
  },
  onResetLimit() {
    dispatch(resetLimit());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & GenresProps;

function Genres({
  genres,
  genreState,
  onChangeGenre,
  onResetLimit,
}: ConnectedComponentProps): JSX.Element {
  const handleGenreClick = (
    evt: MouseEvent<HTMLAnchorElement>,
    genre: string,
  ) => {
    evt.preventDefault();

    onChangeGenre(genre);
    onResetLimit();
  };

  const genreClasses = (genre: string) =>
    cn({
      'catalog__genres-item': true,
      'catalog__genres-item--active': genre === genreState,
    });

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li className={genreClasses(genre)} key={genre}>
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

export { Genres };

export default connector(Genres);
