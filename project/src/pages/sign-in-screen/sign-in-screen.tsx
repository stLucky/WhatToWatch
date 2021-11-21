import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SignIn from '../../components/sign-in/sign-in';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user/selectors';

function SignInScreen(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.Root} />;
  }

  return (
    <div className="user-page">
      <Header className="user-page__head" isVisibleUserMenu={false}>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>
      <SignIn />
      <Footer />
    </div>
  );
}

export default SignInScreen;
