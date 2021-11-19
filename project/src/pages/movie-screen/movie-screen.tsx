import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Films from '../../components/films/films';
import Tabs from '../../components/tabs/tabs';
import ErrorScreen from '../error-screen/error-screen';
import { fetchFilmAction, fetchSimilarAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import Loader from 'react-loader-spinner';
import styles from './movie-screen.module.scss';
import { ANOTHER_TIME_ERROR, ERROR_404, OTHER_ERRORS } from '../../const';
import Controls from '../../components/controls/controls';
import { getErrorFilmStatus, getFilm, getLoadingFilmStatus } from '../../store/film/selectors';
import { getErrorSimilarStatus, getLoadingSimilarStatus, getSimilar } from '../../store/similar-films/selectors';

const MAX_VISIBLE_SIMILAR_FILMS = 4;

function MovieScreen(): JSX.Element {
  const film = useSelector(getFilm);
  const isFilmLoading = useSelector(getLoadingFilmStatus);
  const filmError = useSelector(getErrorFilmStatus);
  const similar = useSelector(getSimilar);
  const isSimilarLoading = useSelector(getLoadingSimilarStatus);
  const isSimilarError = useSelector(getErrorSimilarStatus);

  const dispatch = useDispatch();

  const { id }: { id: string } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchFilmAction(id));
    dispatch(fetchSimilarAction(id));
  }, [dispatch, id]);

  const getSimilarContent = () => {
    if (isSimilarLoading) {
      return (
        <div className={styles.similarWrap}>
          <Loader type="Oval" color="#eee5b5" height={50} width={50} />
        </div>
      );
    }

    if (isSimilarError) {
      return (
        <div className={styles.similarWrap}>
          <p className={styles.similarText}>{ANOTHER_TIME_ERROR}</p>
        </div>
      );
    }

    return (
      <Films
        films={similar.slice(0, MAX_VISIBLE_SIMILAR_FILMS)}
        hasPlayer={false}
      />
    );
  };

  if (isFilmLoading) {
    return <LoadingScreen />;
  }

  if (filmError === ERROR_404.toString()) {
    return <ErrorScreen type="404" />;
  }

  if (filmError === OTHER_ERRORS) {
    return <ErrorScreen />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src="img/bg-the-grand-budapest-hotel.jpg"
              alt="The Grand Budapest Hotel"
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header className="film-card__head" isAuthorizedUser />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.rating}</span>
              </p>

              <Controls hasReviewControl />
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterImage}
                alt={film.name}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <Tabs currentFilm={film} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          {getSimilarContent()}
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MovieScreen;
