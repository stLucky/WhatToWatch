import { createReducer } from '@reduxjs/toolkit';
import { FilmType } from '../../types/films';
import { FilmsData } from '../../types/state';
import {
  changeFavoriteStatus,
  loadFilmError,
  loadFilmRequest,
  loadFilmsError,
  loadFilmsRequest,
  loadFilmsSuccess,
  loadFilmSuccess,
  loadMyListError,
  loadMyListRequest,
  loadMyListSuccess,
  loadPromoError,
  loadPromoRequest,
  loadPromoSuccess,
  loadSimilarError,
  loadSimilarRequest,
  loadSimilarSuccess
} from '../actions';

const initialState: FilmsData = {
  films: [],
  myList: [],
  promo: {} as FilmType,
  film: {} as FilmType,
  similar: [],
  isFilmsLoading: false,
  isFilmsError: false,
  isPromoLoading: false,
  isPromoError: false,
  isFilmLoading: false,
  filmError: '',
  isSimilarLoading: false,
  isSimilarError: false,
  isMyListLoading: false,
  isMyListError: false,
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
    .addCase(loadPromoRequest, (state, action) => {
      state.isPromoLoading = action.payload;
    })
    .addCase(loadPromoSuccess, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(loadPromoError, (state) => {
      state.isPromoError = true;
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
    })
    .addCase(changeFavoriteStatus, (state, { payload: { id, isFavorite } }) => {
      if (state.promo.id === id) {
        state.promo = { ...state.promo, isFavorite };
      }

      if (state.film.id === id) {
        state.film = { ...state.film, isFavorite };
      }
    })
    .addCase(loadMyListRequest, (state, action) => {
      state.isMyListLoading = action.payload;
    })
    .addCase(loadMyListSuccess, (state, action) => {
      state.myList = action.payload;
    })
    .addCase(loadMyListError, (state, action) => {
      state.isMyListError = action.payload;
    });
});

export { filmsData };
