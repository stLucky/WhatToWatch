import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import FilmsList from '../components/films-list/films-list';
import Footer from '../components/footer/footer';
import FilmsGenres from '../components/films-genres/films-genres';
import Header from '../components/header/header';
import ShowMore from '../components/show-more/show-more';
import { State } from '../types/state';
import { getGenres } from '../films';
import { SHOWN_COUNT_FILMS } from '../const';
import { resetCounter } from '../store/action';
import { Actions } from '../types/action';

type MainScreenProps = {
  promoFilmInfo: {
    title: string;
    genre: string;
    releaseDate: number;
  };
};

const mapStateToProps = ({ films, counter }: State) => ({
  films,
  counter,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onResetCounter() {
    dispatch(resetCounter());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainScreenProps;

function MainScreen({
  promoFilmInfo: { title, genre, releaseDate },
  films,
  counter,
  onResetCounter,
}: ConnectedComponentProps): JSX.Element {

  const renderedFilms = films.slice(0, counter);
  const isRenderedShowMore =
    films.length > SHOWN_COUNT_FILMS && films.length !== renderedFilms.length;

  useEffect(() => {
    onResetCounter();
  }, [onResetCounter]);

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
          <FilmsGenres genres={getGenres()} />
          <FilmsList films={renderedFilms} hasPlayer />
          {isRenderedShowMore && <ShowMore />}
        </section>
        <Footer onMain />
      </div>
    </>
  );
}

export { MainScreen };

export default connector(MainScreen);
