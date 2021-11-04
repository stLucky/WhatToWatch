import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { loginAction } from '../store/api-actions';
import { ThunkAppDispatch } from '../types/actions';
import { AuthData } from '../types/auth-data';
// import { AppRoute } from '../const';
import cn from 'classnames';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: AuthData) {
    dispatch(loginAction(authData));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SignInScreen({ onSubmit }: PropsFromRedux): JSX.Element {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password: string) =>
    /^([0-9A-Z]+[0-9A-Z]+)+$/i.test(password);

  const emailClasses = cn('sign-in__field', {
    'sign-in__field--error': !isValidEmail,
  });
  const passwordClasses = cn('sign-in__field', {
    'sign-in__field--error': !isValidPassword,
  });

  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (target.value.length > 0) {
      setIsValidEmail(true);
      setIsValidPassword(true);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const email = loginRef.current.value;
      const password = passwordRef.current.value;

      if (!validateEmail(email) && validatePassword(password)) {
        setIsValidEmail(false);
        return;
      }

      if (validateEmail(email) && !validatePassword(password)) {
        setIsValidPassword(false);
        return;
      }

      if (!validateEmail(email) && !validatePassword(password)) {
        setIsValidEmail(false);
        setIsValidPassword(false);
        return;
      }

      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="user-page">
      <Header className="user-page__head" isSignInPage>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={handleSubmit}
          noValidate
        >
          {((!isValidEmail && isValidPassword) ||
            (isValidEmail && !isValidPassword)) && (
            <div className="sign-in__message">
              <p>
                Please enter a valid {!isValidEmail ? 'email' : 'password'}{' '}
                address
              </p>
            </div>
          )}

          {!isValidEmail && !isValidPassword && (
            <div className="sign-in__message">
              <p>
                We can’t recognize this email <br /> and password combination.
                Please try again.
              </p>
            </div>
          )}

          <div className="sign-in__fields">
            <div className={emailClasses}>
              <input
                ref={loginRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                onChange={handleChange}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className={passwordClasses}>
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                onChange={handleChange}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export { SignInScreen };
export default connector(SignInScreen);
