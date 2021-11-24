import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import CommentForm from './comment-form';
import { Provider } from 'react-redux';
import { NameSpace } from '../../store/root-reducer';

const MAX_RATING = 10;

const incorrectCommentLess = 'Lorem';
const incorrectCommentMore =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt suscipit repellat ratione iure tempora aspernatur error, nostrum commodi fuga enim quod officia sequi eligendi tempore recusandae obcaecati? Aliquam, ut dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt suscipit repellat ratione iure tempora aspernatur error, nostrum commodi fuga enim quod officia sequi eligendi tempore recusandae obcaecati? Aliquam, ut dolor.';
const correctComment =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt suscipit repellat ratione iure tempora aspernatur error, nostrum commodi fuga enim quod officia sequi eligendi tempore recusandae obcaecati? Aliquam, ut dolor.';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Reviews]: { isSendReviewLoading: false },
});

store.dispatch = jest.fn();

describe('Component: CommentForm', () => {
  it('should render correctly when isSendReviewLoading is false', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CommentForm />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getAllByRole('radio')).toHaveLength(MAX_RATING);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post/i })).toBeDisabled();
  });

  it('should render correctly when isSendReviewLoading is true', () => {
    const testStore = mockStore({
      [NameSpace.Reviews]: { isSendReviewLoading: true },
    });

    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <CommentForm />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /post/i })).toBeNull();
  });

  it('should unlock submitBtn and dispatch store should be called when form is filled out correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CommentForm />
        </MemoryRouter>
      </Provider>,
    );

    expect(store.dispatch).not.toBeCalled();

    const submitBtn = screen.getByRole('button', { name: /post/i });
    expect(submitBtn).toBeDisabled();

    userEvent.type(screen.getByRole('textbox'), `${correctComment}`);
    userEvent.click(screen.getByTestId('star-5'));

    expect(submitBtn).not.toBeDisabled();
    userEvent.click(submitBtn);

    expect(store.dispatch).toBeCalled();
  });

  it('should not unlock submitBtn and dispatch store should not be called when rating is not filled', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CommentForm />
        </MemoryRouter>
      </Provider>,
    );

    expect(store.dispatch).not.toBeCalled();

    const submitBtn = screen.getByRole('button', { name: /post/i });
    expect(submitBtn).toBeDisabled();

    userEvent.type(screen.getByRole('textbox'), `${correctComment}`);

    expect(submitBtn).toBeDisabled();
    userEvent.click(submitBtn);

    expect(store.dispatch).not.toBeCalled();
  });

  it('should not unlock submitBtn and dispatch store should not be called when enter incorrect comment with fewer symbols', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CommentForm />
        </MemoryRouter>
      </Provider>,
    );

    expect(store.dispatch).not.toBeCalled();

    const submitBtn = screen.getByRole('button', { name: /post/i });
    expect(submitBtn).toBeDisabled();

    userEvent.type(screen.getByRole('textbox'), `${incorrectCommentLess}`);
    userEvent.click(screen.getByTestId('star-7'));

    expect(submitBtn).toBeDisabled();
    userEvent.click(submitBtn);

    expect(store.dispatch).not.toBeCalled();
  });

  it('should not unlock submitBtn and dispatch store should not be called when enter incorrect comment with lot symbols', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CommentForm />
        </MemoryRouter>
      </Provider>,
    );

    expect(store.dispatch).not.toBeCalled();

    const submitBtn = screen.getByRole('button', { name: /post/i });
    expect(submitBtn).toBeDisabled();

    userEvent.type(screen.getByRole('textbox'), `${incorrectCommentMore}`);
    userEvent.click(screen.getByTestId('star-7'));

    expect(submitBtn).toBeDisabled();
    userEvent.click(submitBtn);

    expect(store.dispatch).not.toBeCalled();
  });
});
