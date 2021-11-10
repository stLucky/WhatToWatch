import { Link, useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Films from '../../components/films/films';
import Tabs from '../../components/tabs/tabs';
import { ThunkAppDispatch } from '../../types/actions';
import ErrorScreen from '../error-screen/error-screen';
import { fetchFilmAction, fetchSimilarAction } from '../../store/api-actions';
import { State } from '../../types/state';
import LoadingScreen from '../loading-screen/loading-screen';
import Loader from 'react-loader-spinner';
import styles from './movie-screen.module.scss';
import {
  ANOTHER_TIME_ERROR,
  AuthorizationStatus,
  ERROR_404,
  OTHER_ERRORS
} from '../../const';

const MAX_VISIBLE_SIMILAR_FILMS = 4;

const mapStateToProps = ({
  film,
  isFilmLoading,
  filmError,
  similar,
  isSimilarLoading,
  isSimilarError,
  authorizationStatus,
}: State) => ({
  film,
  isFilmLoading,
  filmError,
  similar,
  isSimilarLoading,
  isSimilarError,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onFetchFilm(id: string) {
    dispatch(fetchFilmAction(id));
  },
  onFetchSimilar(id: string) {
    dispatch(fetchSimilarAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MovieScreen({
  film,
  isFilmLoading,
  filmError,
  similar,
  isSimilarLoading,
  isSimilarError,
  authorizationStatus,
  onFetchFilm,
  onFetchSimilar,
}: PropsFromRedux): JSX.Element {
  const { id }: { id: string } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    onFetchFilm(id);
    onFetchSimilar(id);
  }, [onFetchFilm, onFetchSimilar, id]);

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
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <Link
                    to={`/films/${film.id}/review`}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>
                )}
              </div>
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

export { MovieScreen };

export default connector(MovieScreen);
