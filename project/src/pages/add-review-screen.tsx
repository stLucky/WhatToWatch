import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';
import Header from '../components/header/header';
import CommentForm from '../components/comment-form/comment-form';
import ErrorScreen from './error-screen/error-screen';
import { State } from '../types/state';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = ({ film }: State) => ({
  film,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function AddReviewScreen({ film }: PropsFromRedux): JSX.Element {
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

export { AddReviewScreen };

export default connector(AddReviewScreen);
