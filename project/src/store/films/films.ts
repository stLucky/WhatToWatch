import { createReducer } from '@reduxjs/toolkit';
import { FilmsData } from '../../types/state';
import {
  loadFilmsError,
  loadFilmsRequest,
  loadFilmsSuccess
} from '../actions';

const initialState: FilmsData = {
  films: [],
  isFilmsLoading: false,
  isFilmsError: false,
};

const films = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilmsRequest, (state, action) => {
      state.isFilmsLoading = action.payload;
    })
    .addCase(loadFilmsSuccess, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadFilmsError, (state) => {
      state.isFilmsError = true;
    });
});

export { films };
