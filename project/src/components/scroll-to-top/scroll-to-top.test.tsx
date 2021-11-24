import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import ScrollToTop from './scroll-to-top';

describe('Component: ScrollToTop', () => {
  it('should render correctly if logo located in main page', () => {
    window.scrollTo = jest.fn();

    render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toBeCalledTimes(1);
  });
});
