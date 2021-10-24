import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import FilmsList from '../components/films-list/films-list';
import FilmTabs from '../components/film-tabs/film-tabs';
import Screen404 from './screen-404/screen-404';
import { useParams } from 'react-router-dom';
import { Films, Film } from '../types/films';
import { Reviews } from '../types/reviews';

const MAX_VISIBLE_MORE_FILMS = 4;

type MovieScreenProps = {
  films: Films;
  reviews: Reviews;
};

function MovieScreen({ films, reviews }: MovieScreenProps): JSX.Element {
  const { id }: { id: string } = useParams();

  const currentFilm: Film | undefined = films.find((film) => film.id === +id);
  const currentReviews: Reviews = reviews.filter((review) => review.id === +id);
  const similarGenreFilms: Films = films.filter(
    (film) => film.genre === currentFilm?.genre,
  );

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

            <Header className="film-card__head" isAuthorizedUser />

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
                <FilmTabs
                  currentFilm={currentFilm}
                  currentReviews={currentReviews}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <FilmsList
              films={similarGenreFilms.slice(MAX_VISIBLE_MORE_FILMS)}
              hasPlayer={false}
            />
          </section>
          <Footer />
        </div>
      </>
    );
  }

  return <Screen404 />;
}

export default MovieScreen;
