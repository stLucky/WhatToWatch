import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';
import Header from '../components/header/header';
import CommentForm from '../components/comment-form/comment-form';
import { useParams } from 'react-router-dom';
import { FilmsType, FilmType } from '../types/films';
import ErrorScreen from './error-screen/error-screen';

type AddReviewScreenProps = {
  films: FilmsType;
};

function AddReviewScreen({ films }: AddReviewScreenProps): JSX.Element {
  const { id }: { id: string } = useParams();

  const currentFilm: FilmType | undefined = films.find(
    (film) => film.id === +id,
  );

  if (currentFilm) {
    return (
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={currentFilm.backgroundImage} alt={currentFilm.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header isAuthorizedUser>
            <Breadcrumbs filmName={currentFilm.name} id={currentFilm.id} />
          </Header>

          <div className="film-card__poster film-card__poster--small">
            <img
              src={currentFilm.posterImage}
              alt={`${currentFilm.name} poster`}
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
