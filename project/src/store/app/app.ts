import { DEFAULT_GENRE, SHOWN_COUNT_FILMS } from '../../const';
import { AppProcess } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import { changeActiveGenre, incrementLimit, resetLimit } from '../actions';

const initialState: AppProcess = {
  activeGenre: DEFAULT_GENRE,
  limit: SHOWN_COUNT_FILMS,
};

const app = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(incrementLimit, (state, action) => {
      state.limit = state.limit + action.payload;
    })
    .addCase(resetLimit, (state) => {
      state.limit = initialState.limit;
    });
});

export { app };
