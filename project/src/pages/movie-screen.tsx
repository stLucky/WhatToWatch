import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import FilmsList from '../components/films-list/films-list';
import Screen404 from './screen-404/screen-404';
import { AppRoute } from '../const';
import { useParams } from 'react-router-dom';
import { Films, Film } from '../types/films';
import { getFormattedRatig } from '../utils';

const MAX_VISIBLE_MORE_FILMS = 4;

type MovieScreenProps = {
  films: Films;
};

function MovieScreen({ films }: MovieScreenProps): JSX.Element {
  const { id }: { id: string } = useParams();

  const currentFilm: Film | undefined = films.find((film) => film.id === +id);

  if (currentFilm) {
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

            <Header
              pathLogo={AppRoute.Root}
              className="film-card__head"
              isAuthorizedUser
            />

            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{currentFilm.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{currentFilm.genre}</span>
                  <span className="film-card__year">{currentFilm.rating}</span>
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
                  <a
                    href={`/films/${currentFilm.id}/review`}
                    className="btn film-card__button"
                  >
                    Add review
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <img
                  src={currentFilm.posterImage}
                  alt={currentFilm.name}
                  width="218"
                  height="327"
                />
              </div>

              <div className="film-card__desc">
                <nav className="film-nav film-card__nav">
                  <ul className="film-nav__list">
                    <li className="film-nav__item film-nav__item--active">
                      <a href="#" className="film-nav__link">
                        Overview
                      </a>
                    </li>
                    <li className="film-nav__item">
                      <a href="#" className="film-nav__link">
                        Details
                      </a>
                    </li>
                    <li className="film-nav__item">
                      <a href="#" className="film-nav__link">
                        Reviews
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="film-rating">
                  <div className="film-rating__score">{currentFilm.rating}</div>
                  <p className="film-rating__meta">
                    <span className="film-rating__level">
                      {getFormattedRatig(currentFilm.rating)}
                    </span>
                    <span className="film-rating__count">
                      {currentFilm.scoresCount} ratings
                    </span>
                  </p>
                </div>

                <div className="film-card__text">
                  <p>{currentFilm.description}</p>

                  <p className="film-card__director">
                    <strong>Director: {currentFilm.director}</strong>
                  </p>

                  <p className="film-card__starring">
                    <strong>{currentFilm.starring.join(', ')}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <FilmsList films={films.slice(MAX_VISIBLE_MORE_FILMS)} />
          </section>
          <Footer path={AppRoute.Root} />
        </div>
      </>
    );
  }

  return <Screen404 />;
}

export default MovieScreen;
