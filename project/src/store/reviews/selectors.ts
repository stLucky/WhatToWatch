import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { ReviewsType } from '../../types/reviews';

export const getReviews = (state: State): ReviewsType =>
  state[NameSpace.Reviews].reviews;

export const getLoadingReviewsStatus = (state: State): boolean =>
  state[NameSpace.Reviews].isReviewsLoading;

export const getErrorReviewsStatus = (state: State): boolean =>
  state[NameSpace.Reviews].isReviewsError;

export const getLoadingSendReviewStatus = (state: State): boolean =>
  state[NameSpace.Reviews].isSendReviewLoading;
