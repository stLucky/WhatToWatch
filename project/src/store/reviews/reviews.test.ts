import { makeFakeReviews } from '../../mocks/reviews';
import {
  loadReviewsError,
  loadReviewsRequest,
  loadReviewsSuccess,
  sendReviewRequest
} from '../actions';
import { reviews } from './reviews';

const state = {
  reviews: [],
  isReviewsLoading: false,
  isReviewsError: false,
  isSendReviewLoading: false,
};

const fakeReviews = makeFakeReviews();

describe('Reducer: reviews', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviews(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should set value loading by a true', () => {
    expect(reviews(state, loadReviewsRequest(true))).toEqual({
      ...state,
      isReviewsLoading: true,
    });
  });

  it('should set reviews will be downloaded from the server', () => {
    expect(reviews(state, loadReviewsSuccess(fakeReviews))).toEqual({
      ...state,
      reviews: fakeReviews,
    });
  });

  it('should set value error by a true', () => {
    expect(reviews(state, loadReviewsError(true))).toEqual({
      ...state,
      isReviewsError: true,
    });
  });

  it('should set value isSendReviewLoading by a true', () => {
    expect(reviews(state, sendReviewRequest(true))).toEqual({
      ...state,
      isSendReviewLoading: true,
    });
  });
});
