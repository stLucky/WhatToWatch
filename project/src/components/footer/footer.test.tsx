import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './footer';

describe('Component: Films', () => {
  it('should render correctly if not located on main page', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/What to watch/i)).toBeInTheDocument();
  });

  it('should render correctly if located on main page', () => {
    render(
      <MemoryRouter>
        <Footer onMain />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByText(/What to watch/i)).toBeInTheDocument();
  });
});
