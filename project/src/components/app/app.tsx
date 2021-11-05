import { connect, ConnectedProps } from 'react-redux';
import MainScreen from '../../pages/main-screen';
import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { AppRoute } from '../../const';
import SignInScreen from '../../pages/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen';
import MovieScreen from '../../pages/movie-screen';
import AddReviewScreen from '../../pages/add-review-screen';
import PlayerScreen from '../../pages/player-screen';
import PrivateRoute from '../private-route/private-route';
import { reviews } from '../../mocks/reviews';
import { State } from '../../types/state';
import browserHistory from '../../browser-history';
import ErrorScreen from '../../pages/error-screen/error-screen';

type AppScreenProps = {
  promoFilmInfo: {
    title: string;
    genre: string;
    releaseDate: number;
  };
};

const mapStateToProps = ({ films }: State) => ({
  films,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppScreenProps;

function App({ promoFilmInfo, films }: ConnectedComponentProps): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <MainScreen promoFilmInfo={promoFilmInfo} />
        </Route>
        <Route path={AppRoute.Login} exact>
          <SignInScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyListScreen films={films} />}
        />
        <Route path={AppRoute.Film} exact>
          <MovieScreen films={films} reviews={reviews} />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.AddReview}
          render={() => <AddReviewScreen films={films} />}
        />
        <Route path={AppRoute.Player} exact>
          <PlayerScreen films={films} />
        </Route>
        <Route>
          <ErrorScreen type="404" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
