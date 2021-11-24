import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Promo from './promo';
import { makeFakeFilm } from '../../mocks/films';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../store/root-reducer';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { AuthorizationStatus } from '../../const';

const IMAGE_COUNT = 2;

const fakeFilm = makeFakeFilm();

const mockStore = configureMockStore();
let store: Store;

describe('Component: Promo', () => {
  it('should render correctly when has not error', () => {
    store = mockStore({
      [NameSpace.Promo]: { promo: fakeFilm, isPromoError: false },
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Film]: { film: {} },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Promo />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getAllByAltText(`${fakeFilm.name}`)).toHaveLength(
      IMAGE_COUNT,
    );
    expect(screen.getByRole('heading', { name: `${fakeFilm.name}` })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /wtw/i })).toBeInTheDocument();
    expect(screen.getByText(`${fakeFilm.genre}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeFilm.released}`)).toBeInTheDocument();
  });

  it('should render correctly when has error', () => {
    store = mockStore({
      [NameSpace.Promo]: { promo: fakeFilm, isPromoError: true },
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Film]: { film: {} },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Promo />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryAllByAltText(`${fakeFilm.name}`)).toHaveLength(0);
    expect(screen.queryByRole('heading', { name: `${fakeFilm.name}` })).toBeNull();
    expect(screen.queryByText(`${fakeFilm.genre}`)).toBeNull();
    expect(screen.queryByText(`${fakeFilm.released}`)).toBeNull();
    expect(screen.getByRole('heading', { name: /wtw/i })).toBeInTheDocument();
  });
});
