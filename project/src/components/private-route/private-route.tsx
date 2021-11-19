import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getCheckAuthStatus } from '../../store/user/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
};

function PrivateRoute({ exact, path, render }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isCheckAuthLoading = useSelector(getCheckAuthStatus);

  if(isCheckAuthLoading) {
    return <LoadingScreen/>;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        authorizationStatus === AuthorizationStatus.Auth ? (
          render()
        ) : (
          <Redirect to={AppRoute.Login} />
        )}
    />
  );
}

export default PrivateRoute;
