import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import SignIn from '../components/sign-in/sign-in';

function SignInScreen(): JSX.Element {
  return (
    <div className='user-page'>
      <Header className='user-page__head' isVisibleUserMenu={false}>
        <h1 className='page-title user-page__title'>Sign in</h1>
      </Header>
      <SignIn />
      <Footer />
    </div>
  );
}

export default SignInScreen;
