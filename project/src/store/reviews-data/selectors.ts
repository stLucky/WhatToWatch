import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { ReviewsType } from '../../types/reviews';

export const getReviews = (state: State): ReviewsType =>
  state[NameSpace.dataReviews].reviews;

export const getLoadingReviewsStatus = (state: State): boolean =>
  state[NameSpace.dataReviews].isReviewsLoading;

export const getErrorReviewsStatus = (state: State): boolean =>
  state[NameSpace.dataReviews].isReviewsError;

export const getLoadingSendReviewStatus = (state: State): boolean =>
  state[NameSpace.dataReviews].isSendReviewLoading;
