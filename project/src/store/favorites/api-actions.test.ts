import { fetchFavoriteStatusAction, fetchMyListAction } from './api-actions';
import {
  APIRoute,
  ERROR_404,
  ERROR_401,
  FavoriteStatus,
  SUCCESS_RESPONSE_CODE
} from '../../const';
import { makeFakeFilm, makeFakeFilms } from '../../mocks/films';
import { mockAPI } from '../../mocks/api';
import { makeMockStore } from '../../mocks/store';
import {
  changeFavoriteStatus,
  loadMyListError,
  loadMyListRequest,
  loadMyListSuccess
} from '../actions';

const films = makeFakeFilms();
const film = makeFakeFilm();
const id = film.id.toString();

describe('Favorites async actions', () => {
  it('should dispatch LoadMyListRequest and loadMyListSuccess when request GET /favorite', async () => {
    const store = makeMockStore();

    mockAPI.onGet(APIRoute.Favorite).reply(SUCCESS_RESPONSE_CODE, films);

    await store.dispatch(fetchMyListAction());

    expect(store.getActions()).toEqual([
      loadMyListRequest(true),
      loadMyListSuccess(films),
      loadMyListRequest(false),
    ]);
  });

  it('should dispatch LoadMyListRequest and loadMyListError when request GET /favorite will fail', async () => {
    const store = makeMockStore();

    mockAPI.onGet(APIRoute.Favorite).reply(ERROR_404, []);

    await store.dispatch(fetchMyListAction());

    expect(store.getActions()).toEqual([
      loadMyListRequest(true),
      loadMyListError(true),
      loadMyListRequest(false),
    ]);
  });

  it('should dispatch changeFavoriteStatus when request POST /favorite/: film_id/: status', async () => {
    const store = makeMockStore();

    mockAPI
      .onPost(`${APIRoute.Favorite}/${id}/${FavoriteStatus.On}`)
      .reply(SUCCESS_RESPONSE_CODE, {...film, isFavorite: true});

    await store.dispatch(fetchFavoriteStatusAction(id, FavoriteStatus.On));

    expect(store.getActions()).toEqual([
      changeFavoriteStatus({...film, isFavorite: true}),
    ]);
  });


  it('should not to be dispatch when request POST /favorite/: film_id/: status will fail', async () => {
    const store = makeMockStore();

    mockAPI
      .onPost(`${APIRoute.Favorite}/${id}/${FavoriteStatus.On}`)
      .reply(ERROR_401, []);

    await store.dispatch(fetchFavoriteStatusAction(id, FavoriteStatus.On));

    expect(store.getActions()).toEqual([]);
  });
});
