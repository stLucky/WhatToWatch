import {useSelector, useDispatch} from 'react-redux';
import { MouseEvent } from 'react';
import cn from 'classnames';
import { changeActiveGenre, resetLimit } from '../../store/actions';
import { getActiveGenre } from '../../store/films-process/selectors';

type GenresProps = {
  genres: string[];
};

function Genres({genres}: GenresProps): JSX.Element {
  const activeGenre = useSelector(getActiveGenre);
  const dispatch = useDispatch();

  const handleGenreClick = (
    evt: MouseEvent<HTMLAnchorElement>,
    genre: string,
  ) => {
    evt.preventDefault();
    dispatch(changeActiveGenre(genre));
    dispatch(resetLimit());
  };

  const genreClasses = (genre: string) =>
    cn({
      'catalog__genres-item': true,
      'catalog__genres-item--active': genre === activeGenre,
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

export default Genres;
