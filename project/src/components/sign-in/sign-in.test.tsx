import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import SignIn from './sign-in';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({
  USER: { isAuthLoading: false },
});

describe('Component: SignIn', () => {
  it('should render correctly when isAuthLoading is false', () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render correctly when isAuthLoading is true', () => {
    const specStore = mockStore({
      USER: { isAuthLoading: true },
    });

    render(
      <Provider store={specStore}>
        <SignIn />
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'audio-loading' }),
    ).toBeInTheDocument();
  });

  it('should render correctly when user type in input\'s', () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    userEvent.type(screen.getByLabelText('Email address'), 'keks@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), 'Kek7');

    expect(screen.getByDisplayValue('keks@gmail.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Kek7')).toBeInTheDocument();
  });

  it('when user click on submitBtn with correctly entered data should dispatch action', () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    store.dispatch = jest.fn();

    userEvent.type(screen.getByLabelText('Email address'), 'keks@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), 'Kek7');

    userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(store.dispatch).toHaveBeenCalled();
    expect(screen.queryByTestId('error')).toBeNull();
  });

  it('should show error message when user type incorrect email', () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    userEvent.type(screen.getByLabelText('Email address'), 'keks@gmail');
    userEvent.type(screen.getByLabelText('Password'), 'Kek7');

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('should show error message when user type incorrect password', () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    userEvent.type(screen.getByLabelText('Email address'), 'keks@.com');
    userEvent.type(screen.getByLabelText('Password'), 'ek7');

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('should disable submit button when user type incorrect password', () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    userEvent.type(screen.getByLabelText('Email address'), 'keks@.com');
    userEvent.type(screen.getByLabelText('Password'), 'ek7');
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeDisabled();
  });
});
