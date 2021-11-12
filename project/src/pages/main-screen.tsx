import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Films from '../components/films/films';
import Footer from '../components/footer/footer';
import Genres from '../components/genres/genres';
import Header from '../components/header/header';
import ShowMore from '../components/show-more/show-more';
import { SHOWN_COUNT_FILMS } from '../const';
import { resetLimit } from '../store/actions';
import LoadingScreen from './loading-screen/loading-screen';
import ErrorScreen from './error-screen/error-screen';
import { getFilteredFilms, getGenres, getRenderedFilms } from '../store/films-process/selectors';
import { getErrorFilmsStatus, getLoadingFilmsStatus } from '../store/films-data/selectors';

type MainScreenProps = {
  promoFilmInfo: {
    title: string;
    genre: string;
    releaseDate: number;
  };
};

function MainScreen({
  promoFilmInfo: { title, genre, releaseDate },
}: MainScreenProps): JSX.Element {
  const genres = useSelector(getGenres);
  const filteredFilms = useSelector(getFilteredFilms);
  const renderedFilms = useSelector(getRenderedFilms);
  const isFilmsLoading = useSelector(getLoadingFilmsStatus);
  const isFilmsError = useSelector(getErrorFilmsStatus);
  const dispatch = useDispatch();

  const isShowMoreVisible =
    filteredFilms.length > SHOWN_COUNT_FILMS &&
    filteredFilms.length !== renderedFilms.length;

  useEffect(() => {
    dispatch(resetLimit());
  }, [dispatch]);

  if (isFilmsLoading) {
    return <LoadingScreen />;
  }

  if (isFilmsError) {
    return <ErrorScreen />;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header className="film-card__head" onMain />

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
          <Genres genres={genres} />
          <Films films={renderedFilms} hasPlayer />
          {isShowMoreVisible && <ShowMore />}
        </section>
        <Footer onMain />
      </div>
    </>
  );
}

export default MainScreen;
