import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
};

function PrivateRoute({
  exact,
  path,
  render,
  authorizationStatus,
}: PrivateRouteProps): JSX.Element {
  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        authorizationStatus === AuthorizationStatus.NoAuth ? (
          render()
        ) : (
          <Redirect to={AppRoute.Login} />
        )}
    />
  );
}

export default PrivateRoute;
