import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import Films from '../components/films/films';
import Footer from '../components/footer/footer';
import Genres from '../components/genres/genres';
import Header from '../components/header/header';
import ShowMore from '../components/show-more/show-more';
import { State } from '../types/state';
import { SHOWN_COUNT_FILMS } from '../const';
import { films } from '../mocks/films';
import { FilmsType } from '../types/films';
import { DEFAULT_GENRE, MAX_NUMBER_GENRES } from '../const';
import { Actions } from '../types/action';
import { resetLimit } from '../store/action';

type MainScreenProps = {
  promoFilmInfo: {
    title: string;
    genre: string;
    releaseDate: number;
  };
};

const getGenres = (): string[] => {
  const genres = [DEFAULT_GENRE, ...new Set(films.map((film) => film.genre))];

  if (genres.length > MAX_NUMBER_GENRES) {
    genres.length = MAX_NUMBER_GENRES;
  }

  return genres;
};

const getFilteredFilms = (genre: string): FilmsType =>
  genre === DEFAULT_GENRE
    ? films
    : films.filter((film) => film.genre === genre);

const mapStateToProps = ({ activeGenre, limit }: State) => ({
  activeGenre,
  limit,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onResetLimit() {
    dispatch(resetLimit());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainScreenProps;

function MainScreen({
  promoFilmInfo: { title, genre, releaseDate },
  activeGenre,
  limit,
  onResetLimit,
}: ConnectedComponentProps): JSX.Element {
  const filteredFilms = getFilteredFilms(activeGenre);

  const renderedFilms = filteredFilms.slice(0, limit);
  const isShowMoreVisible =
    filteredFilms.length > SHOWN_COUNT_FILMS &&
    filteredFilms.length !== renderedFilms.length;

  useEffect(() => {
    onResetLimit();
  }, [onResetLimit]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header className="film-card__head" isAuthorizedUser onMain />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{releaseDate}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <Genres genres={getGenres()} />
          <Films films={renderedFilms} hasPlayer />
          {isShowMoreVisible && <ShowMore />}
        </section>
        <Footer onMain />
      </div>
    </>
  );
}

export { MainScreen };

export default connector(MainScreen);
