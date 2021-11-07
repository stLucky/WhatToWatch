import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router';
import MainScreen from '../../pages/main-screen';
import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { AppRoute, AuthorizationStatus } from '../../const';
import SignInScreen from '../../pages/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import AddReviewScreen from '../../pages/add-review-screen';
import PlayerScreen from '../../pages/player-screen';
import PrivateRoute from '../private-route/private-route';
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

const mapStateToProps = ({ films, authorizationStatus }: State) => ({
  films,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppScreenProps;

function App({
  promoFilmInfo,
  films,
  authorizationStatus,
}: ConnectedComponentProps): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <MainScreen promoFilmInfo={promoFilmInfo} />
        </Route>
        <Route path={AppRoute.Login} exact>
          {authorizationStatus === AuthorizationStatus.Auth ? (
            <Redirect to={AppRoute.Root} />
          ) : (
            <SignInScreen />
          )}
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyListScreen films={films} />}
        />
        <Route path={AppRoute.Film} exact>
          <MovieScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.AddReview}
          render={() => <AddReviewScreen />}
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
