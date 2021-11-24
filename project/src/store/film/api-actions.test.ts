import { fetchFilmAction } from './api-actions';
import {
  APIRoute,
  ERROR_401,
  ERROR_404,
  OTHER_ERRORS,
  SUCCESS_RESPONSE_CODE
} from '../../const';
import { loadFilmError, loadFilmRequest, loadFilmSuccess } from '../actions';
import { makeFakeFilm } from '../../mocks/films';
import { mockAPI } from '../../mocks/api';
import { mockStore } from '../../mocks/store';
import { FilmType } from '../../types/films';

const film = makeFakeFilm();
const id = film.id.toString();

describe('Film async actions', () => {
  it('should dispatch LoadFilmRequest, LoadFilmError and LoadFilmSuccess when request GET /films/:id and initialState has error', async () => {
    const state = {
      film: {} as FilmType,
      isFilmLoading: false,
      filmError: 'error',
    };
    const store = mockStore({ FILM: state });

    mockAPI.onGet(`${APIRoute.Films}/${id}`).reply(SUCCESS_RESPONSE_CODE, film);

    await store.dispatch(fetchFilmAction(id));

    expect(store.getActions()).toEqual([
      loadFilmRequest(true),
      loadFilmError(''),
      loadFilmSuccess(film),
      loadFilmRequest(false),
    ]);
  });

  it('should dispatch LoadFilmRequest, and LoadFilmSuccess when request GET /films/:id and initialState has not error', async () => {
    const state = { film: {} as FilmType, isFilmLoading: false, filmError: '' };
    const store = mockStore({ FILM: state });

    mockAPI.onGet(`${APIRoute.Films}/${id}`).reply(SUCCESS_RESPONSE_CODE, film);

    await store.dispatch(fetchFilmAction(id));

    expect(store.getActions()).toEqual([
      loadFilmRequest(true),
      loadFilmSuccess(film),
      loadFilmRequest(false),
    ]);
  });

  it('should dispatch LoadSimilarRequest and LoadSimilarError whith error 404 when request GET /films will fail with 404 error', async () => {
    const state = { film: {} as FilmType, isFilmLoading: false, filmError: '' };
    const store = mockStore({ FILM: state });

    mockAPI.onGet(`${APIRoute.Films}/${id}`).reply(ERROR_404, []);

    await store.dispatch(fetchFilmAction(id));

    expect(store.getActions()).toEqual([
      loadFilmRequest(true),
      loadFilmError(ERROR_404.toString()),
      loadFilmRequest(false),
    ]);
  });

  it('should dispatch LoadSimilarRequest and LoadSimilarError whith other error when request GET /films will fail with other error', async () => {
    const state = { film: {} as FilmType, isFilmLoading: false, filmError: '' };
    const store = mockStore({ FILM: state });

    mockAPI.onGet(`${APIRoute.Films}/${id}`).reply(ERROR_401, []);

    await store.dispatch(fetchFilmAction(id));

    expect(store.getActions()).toEqual([
      loadFilmRequest(true),
      loadFilmError(OTHER_ERRORS),
      loadFilmRequest(false),
    ]);
  });
});
