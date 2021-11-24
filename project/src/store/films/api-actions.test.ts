import { fetchFilmsAction } from './api-actions';
import { APIRoute, ERROR_404, SUCCESS_RESPONSE_CODE } from '../../const';
import { loadFilmsError, loadFilmsRequest, loadFilmsSuccess } from '../actions';
import { makeFakeFilms } from '../../mocks/films';
import { mockAPI } from '../../mocks/api';
import { makeMockStore } from '../../mocks/store';

const films = makeFakeFilms();

describe('Films async actions', () => {
  it('should dispatch LoadFilmsRequest and LoadFilmsSuccess when request GET /films', async () => {
    const store = makeMockStore();

    mockAPI.onGet(APIRoute.Films).reply(SUCCESS_RESPONSE_CODE, films);

    await store.dispatch(fetchFilmsAction());

    expect(store.getActions()).toEqual([
      loadFilmsRequest(true),
      loadFilmsSuccess(films),
      loadFilmsRequest(false),
    ]);
  });

  it('should dispatch LoadFilmsRequest and LoadFilmsError when request GET /films will fail', async () => {
    const store = makeMockStore();

    mockAPI.onGet(APIRoute.Films).reply(ERROR_404, []);

    await store.dispatch(fetchFilmsAction());

    expect(store.getActions()).toEqual([
      loadFilmsRequest(true),
      loadFilmsError(),
      loadFilmsRequest(false),
    ]);
  });
});
