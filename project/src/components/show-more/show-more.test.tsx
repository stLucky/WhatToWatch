import { render, screen } from '@testing-library/react';
import ShowMore from './show-more';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const store = mockStore({});
store.dispatch = jest.fn();

describe('Component: ShowMore', () => {
  it('should render correctly and when click on the button should be dispatch store', () => {
    render(
      <Provider store={store}>
        <ShowMore />
      </Provider>,
    );
    const button = screen.getByRole('button', { name: /show more/i });

    expect(store.dispatch).not.toBeCalled();
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    expect(store.dispatch).toBeCalled();
  });
});
