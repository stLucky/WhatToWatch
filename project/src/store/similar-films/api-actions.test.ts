import { fetchSimilarAction } from './api-actions';
import { APIRoute, ERROR_404, SUCCESS_RESPONSE_CODE } from '../../const';
import { makeFakeFilm, makeFakeFilms } from '../../mocks/films';
import { mockAPI } from '../../mocks/api';
import { makeMockStore, mockStore } from '../../mocks/store';
import {
  loadSimilarError,
  loadSimilarRequest,
  loadSimilarSuccess
} from '../actions';
import { NameSpace } from '../root-reducer';

const films = makeFakeFilms();
const film = makeFakeFilm();
const id = film.id.toString();

describe('Similar Films async actions', () => {
  it('should dispatch LoadSimilarRequest and LoadSimilarSuccess when request GET /films/:id/similar', async () => {
    const state = {
      similar: [],
      isSimilarLoading: false,
      isSimilarError: false,
    };
    const store = mockStore({ [NameSpace.SimilarFilms]: state });

    mockAPI
      .onGet(`${APIRoute.Films}/${id}/similar`)
      .reply(SUCCESS_RESPONSE_CODE, films);

    await store.dispatch(fetchSimilarAction(id));

    expect(store.getActions()).toEqual([
      loadSimilarRequest(true),
      loadSimilarSuccess(films),
      loadSimilarRequest(false),
    ]);
  });

  it('should dispatch LoadSimilarRequest, LoadSimilarError and LoadSimilarSuccess when request GET /films/:id/similar', async () => {
    const state = {
      similar: [],
      isSimilarLoading: false,
      isSimilarError: true,
    };
    const store = mockStore({ [NameSpace.SimilarFilms]: state });

    mockAPI
      .onGet(`${APIRoute.Films}/${id}/similar`)
      .reply(SUCCESS_RESPONSE_CODE, films);

    await store.dispatch(fetchSimilarAction(id));

    expect(store.getActions()).toEqual([
      loadSimilarRequest(true),
      loadSimilarError(false),
      loadSimilarSuccess(films),
      loadSimilarRequest(false),
    ]);
  });

  it('should dispatch LoadSimilarRequest and LoadSimilarError when request GET /films will fail', async () => {
    const store = makeMockStore();

    mockAPI.onGet(`${APIRoute.Films}/${id}/similar`).reply(ERROR_404, []);

    await store.dispatch(fetchSimilarAction(id));

    expect(store.getActions()).toEqual([
      loadSimilarRequest(true),
      loadSimilarError(true),
      loadSimilarRequest(false),
    ]);
  });
});
