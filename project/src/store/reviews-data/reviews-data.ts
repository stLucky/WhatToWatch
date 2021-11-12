import { createReducer } from '@reduxjs/toolkit';
import { ReviewsData } from '../../types/state';
import { loadReviewsError, loadReviewsRequest, loadReviewsSuccess, sendReviewRequest } from '../actions';

const initialState: ReviewsData = {
  reviews: [],
  isReviewsLoading: false,
  isReviewsError: false,
  isSendReviewLoading: false,
};

const reviewsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviewsRequest, (state, action) => {
      state.isReviewsLoading = action.payload;
    })
    .addCase(loadReviewsSuccess, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadReviewsError, (state, action) => {
      state.isReviewsError = action.payload;
    })
    .addCase(sendReviewRequest, (state, action) => {
      state.isSendReviewLoading = action.payload;
    });
});

export { reviewsData };
