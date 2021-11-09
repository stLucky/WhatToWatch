import { connect, ConnectedProps } from 'react-redux';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import SignIn from '../components/sign-in/sign-in';
import { AuthorizationStatus } from '../const';
import { State } from '../types/state';
import LoadingScreen from './loading-screen/loading-screen';

const mapStateToProps = ({ authorizationStatus }: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SignInScreen({ authorizationStatus }: PropsFromRedux): JSX.Element {
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
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

export { SignInScreen };

export default connector(SignInScreen);
