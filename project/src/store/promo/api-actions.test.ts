
import { fetchPromoAction } from './api-actions';
import { APIRoute, ERROR_404, SUCCESS_RESPONSE_CODE } from '../../const';
import { makeFakeFilm } from '../../mocks/films';
import { mockAPI } from '../../mocks/api';
import { makeMockStore } from '../../mocks/store';
import { loadPromoError, loadPromoRequest, loadPromoSuccess } from '../actions';

const film = makeFakeFilm();

describe('Promo async actions', () => {
  it('should dispatch LoadPromoRequest and LoadPromoSuccess when request GET /promo', async () => {
    const store = makeMockStore();

    mockAPI.onGet(APIRoute.Promo).reply(SUCCESS_RESPONSE_CODE, film);

    await store.dispatch(fetchPromoAction());

    expect(store.getActions()).toEqual([
      loadPromoRequest(true),
      loadPromoSuccess(film),
      loadPromoRequest(false),
    ]);
  });

  it('should dispatch LoadPromoRequest and LoadPromoError when request GET /promo will fail', async () => {
    const store = makeMockStore();

    mockAPI.onGet(APIRoute.Promo).reply(ERROR_404, []);

    await store.dispatch(fetchPromoAction());

    expect(store.getActions()).toEqual([
      loadPromoRequest(true),
      loadPromoError(true),
      loadPromoRequest(false),
    ]);
  });
});
