import { fetchReviewsAction } from './api-actions';
import { APIRoute, ERROR_404, SUCCESS_RESPONSE_CODE } from '../../const';
import { makeFakeFilm } from '../../mocks/films';
import { mockAPI } from '../../mocks/api';
import { makeMockStore } from '../../mocks/store';
import { makeFakeReviews } from '../../mocks/reviews';
import {
  loadReviewsError,
  loadReviewsRequest,
  loadReviewsSuccess
} from '../actions';

const film = makeFakeFilm();
const id = film.id.toString();
const reviews = makeFakeReviews();

describe('Reviews async actions', () => {
  it('should dispatch LoadReviewsRequest and LoadReviewsSuccess when request GET /comments/:film_id', async () => {
    const store = makeMockStore();

    mockAPI
      .onGet(`${APIRoute.Reviews}/${id}`)
      .reply(SUCCESS_RESPONSE_CODE, reviews);

    await store.dispatch(fetchReviewsAction(id));

    expect(store.getActions()).toEqual([
      loadReviewsRequest(true),
      loadReviewsSuccess(reviews),
      loadReviewsRequest(false),
    ]);
  });

  it('should dispatch LoadReviewsRequest and LoadReviewsError when request GET /promo will fail', async () => {
    const store = makeMockStore();

    mockAPI.onGet(`${APIRoute.Reviews}/${id}`).reply(ERROR_404, []);

    await store.dispatch(fetchReviewsAction(id));

    expect(store.getActions()).toEqual([
      loadReviewsRequest(true),
      loadReviewsError(true),
      loadReviewsRequest(false),
    ]);
  });
});
