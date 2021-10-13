import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';
import Header from '../components/header/header';
import CommentForm from '../components/comment-form/comment-form';
import { AppRoute } from '../const';
import { useParams } from 'react-router-dom';
import { Films, Film } from '../types/films';

type AddReviewScreenProps = {
  films: Films
};

function AddReviewScreen({ films }: AddReviewScreenProps): JSX.Element {
  const { id }: {id: string}= useParams();

  const currentFilm: Film | undefined = films.find((film) => film.id === +id);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img
            src={currentFilm?.backgroundImage}
            alt={currentFilm?.name}
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header pathLogo={AppRoute.Root} isAuthorizedUser>
          <Breadcrumbs filmName={currentFilm?.name} id={currentFilm?.id} />
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={currentFilm?.posterImage}
            alt={`${currentFilm?.name} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>

      <CommentForm />
    </section>
  );
}

export default AddReviewScreen;
