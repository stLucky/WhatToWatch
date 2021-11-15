import { useSelector } from 'react-redux';
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';
import Header from '../components/header/header';
import CommentForm from '../components/comment-form/comment-form';
import ErrorScreen from './error-screen/error-screen';
import { getFilm } from '../store/films-data/selectors';

function AddReviewScreen(): JSX.Element {
  const film = useSelector(getFilm);

  if (film) {
    return (
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header isAuthorizedUser>
            <Breadcrumbs filmName={film.name} id={film.id} />
          </Header>

          <div className="film-card__poster film-card__poster--small">
            <img
              src={film.posterImage}
              alt={`${film.name} poster`}
              width="218"
              height="327"
            />
          </div>
        </div>

        <CommentForm />
      </section>
    );
  }

  return <ErrorScreen />;
}

export default AddReviewScreen;
