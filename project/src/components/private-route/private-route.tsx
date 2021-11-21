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
  // TODO СДЕЛАЛ ЗДЕСЬ ВАРИАНТ С РЕНДЕРИНГОМ ЛОАДЕРА, ЧТОБЫ НЕ БЫЛО ПРЕЖДЕВРЕМЕННОГО РЕДИРЕКТА ПОКА МЫ ЖДЕМ ОТВЕТ ОТ СЕРВЕРА ОБ АВТОРИЗАЦИИ ПОЛЬЗОВАТЕЛЯ
  // TODO НО ЭТО ВЫЗЫВАЕТ ПРОБЛЕМЫ, НАПРИМЕР ПРИ РЕФРЕШЕ СТРАНИЦЫ НА СТРАНИЦЕ С ИЗБРАННЫМИ ФИЛЬМАМИ РЕНДЕРИТСЯ ДВОЙНОЙ ЛОАДЕР - ОТ КОМПОНЕНТА
  // TODO PRIVATEROUTE И КОМПОНЕТА MYLISTSCREEN. КАКОЙ ЗДЕСЬ ВЫХОД? МОЖЕТ ЗАБИТЬ НА СЕРВЕР И ПРОВЕРКУ АВТОРИЗАЦИИ ОТ СЕРВЕРА, И ПРОВЕРЯТЬ АВТОРИЗАЦИЮ ПО КЛЮЧУ В LOCALESTORAGE?

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
