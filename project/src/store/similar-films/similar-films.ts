import { createReducer } from '@reduxjs/toolkit';
import { SimilarFilms } from '../../types/state';
import { loadSimilarError, loadSimilarRequest, loadSimilarSuccess } from '../actions';

const initialState: SimilarFilms = {
  similar: [],
  isSimilarLoading: false,
  isSimilarError: false,
};

const similarFilms = createReducer(initialState, (builder) => {
  builder
    .addCase(loadSimilarRequest, (state, action) => {
      state.isSimilarLoading = action.payload;
    })
    .addCase(loadSimilarSuccess, (state, action) => {
      state.similar = action.payload;
    })
    .addCase(loadSimilarError, (state, action) => {
      state.isSimilarError = action.payload;
    });
});


export { similarFilms };
