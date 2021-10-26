import MainScreen from '../../pages/main-screen';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { AppRoute, AuthorizationStatus } from '../../const';
import SignInScreen from '../../pages/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen';
import MovieScreen from '../../pages/movie-screen';
import AddReviewScreen from '../../pages/add-review-screen';
import PlayerScreen from '../../pages/player-screen';
import Screen404 from '../../pages/screen-404/screen-404';
import PrivateRoute from '../private-route/private-route';
import { Films } from '../../types/films';
import { reviews } from '../../mocks/reviews';

type AppScreenProps = {
  promoFilmInfo: {
    title: string;
    genre: string;
    releaseDate: number;
  };

  films: Films;
};

function App({ promoFilmInfo, films }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
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
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route path={AppRoute.Film} exact>
          <MovieScreen films={films} reviews={reviews} />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.AddReview}
          render={() => <AddReviewScreen films={films} />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route path={AppRoute.Player} exact>
          <PlayerScreen films={films} />
        </Route>
        <Route>
          <Screen404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
