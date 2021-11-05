import { useState, ChangeEvent, FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { loginAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/actions';
import { AuthData } from '../../types/auth-data';
import { State } from '../../types/state';
import cn from 'classnames';
import styles from './sign-in.module.scss';
import Loader from 'react-loader-spinner';

const mapStateToProps = ({ isAuthLoading }: State) => ({
  isAuthLoading,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: AuthData) {
    dispatch(loginAction(authData));
  },
});

const formFields = {
  email: 'Email address',
  password: 'Password',
};

type formFieldProps = {
  value: string;
  error: boolean;
  regex: RegExp;
  errorText: string;
};

type FormStateProps = {
  [key: string]: formFieldProps;
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SignIn({ isAuthLoading, onSubmit }: PropsFromRedux): JSX.Element {
  const [formState, setFormState] = useState<FormStateProps>({
    email: {
      value: '',
      error: false,
      regex: /\S+@\S+\.\S+/,
      errorText: 'Please enter a valid email address',
    },
    password: {
      value: '',
      error: false,
      regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      errorText: 'Please enter a valid password address',
    },
  });

  const formFieldsKeys = Object.keys(formFields);

  const currentError = formFieldsKeys.find((name) => formState[name].error);
  const hasError = formFieldsKeys.some((name) => formState[name].error);
  const isEmptyField = formFieldsKeys.some(
    (name) => formState[name].value === '',
  );

  const isDisabledSend = hasError || isEmptyField || isAuthLoading;

  const btnClasses = cn('sign-in__btn', {
    [styles['btn--disabled']]: isDisabledSend,
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const rule = formState[name].regex;
    const isValidField = rule.test(value);

    if (!isValidField) {
      setFormState({
        ...formState,
        [name]: {
          ...formState[name],
          error: true,
          value,
        },
      });
    } else {
      setFormState({
        ...formState,
        [name]: {
          ...formState[name],
          error: false,
          value,
        },
      });
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isDisabledSend) {
      onSubmit({
        login: formState.email.value,
        password: formState.password.value,
      });
    }
  };

  return (
    <div className="sign-in user-page__content">
      <form
        action="#"
        className="sign-in__form"
        onSubmit={handleSubmit}
        noValidate
      >
        {currentError && (
          <div className="sign-in__message">
            <p>{formState[currentError].errorText}</p>
          </div>
        )}

        <div className="sign-in__fields">
          {Object.entries(formFields).map(([name, label]) => {
            const fieldClasses = cn('sign-in__field', {
              'sign-in__field--error': formState[name].error,
            });

            return (
              <div className={fieldClasses} key={name}>
                <input
                  className="sign-in__input"
                  type={name}
                  placeholder={label}
                  name={name}
                  id={name}
                  value={formState[name].value}
                  onChange={handleChange}
                />
                <label
                  className="sign-in__label visually-hidden"
                  htmlFor={name}
                >
                  {label}
                </label>
              </div>
            );
          })}
        </div>
        <div className="sign-in__submit">
          <button
            className={btnClasses}
            type="submit"
            disabled={isDisabledSend}
          >
            {isAuthLoading ? (
              <Loader type="Oval" color="#eee5b5" height={30} width={30} />
            ) : (
              'Sign in'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export { SignIn };
export default connector(SignIn);
