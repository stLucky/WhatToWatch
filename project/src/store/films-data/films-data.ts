import { createReducer } from '@reduxjs/toolkit';
import { FilmType } from '../../types/films';
import { FilmsData } from '../../types/state';
import {
  loadFilmError,
  loadFilmRequest,
  loadFilmsError,
  loadFilmsRequest,
  loadFilmsSuccess,
  loadFilmSuccess,
  loadSimilarError,
  loadSimilarRequest,
  loadSimilarSuccess
} from '../actions';

const initialState: FilmsData = {
  films: [],
  film: {} as FilmType,
  similar: [],
  isFilmsLoading: false,
  isFilmsError: false,
  isFilmLoading: false,
  filmError: '',
  isSimilarLoading: false,
  isSimilarError: false,
};

const filmsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilmsRequest, (state, action) => {
      state.isFilmsLoading = action.payload;
    })
    .addCase(loadFilmsSuccess, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadFilmsError, (state) => {
      state.isFilmsError = true;
    })
    .addCase(loadFilmRequest, (state, action) => {
      state.isFilmLoading = action.payload;
    })
    .addCase(loadFilmSuccess, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadFilmError, (state, action) => {
      state.filmError = action.payload;
    })
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

export { filmsData };
