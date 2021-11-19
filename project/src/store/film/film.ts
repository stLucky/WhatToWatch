import { createReducer } from '@reduxjs/toolkit';
import { FilmType } from '../../types/films';
import { FilmData } from '../../types/state';
import { changeFavoriteStatus, loadFilmError, loadFilmRequest, loadFilmSuccess } from '../actions';

const initialState: FilmData = {
  film: {} as FilmType,
  isFilmLoading: false,
  filmError: '',
};

const film = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilmRequest, (state, action) => {
      state.isFilmLoading = action.payload;
    })
    .addCase(loadFilmSuccess, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadFilmError, (state, action) => {
      state.filmError = action.payload;
    })
    .addCase(changeFavoriteStatus, (state, { payload: { id, isFavorite } }) => {
      if (state.film.id === id) {
        state.film = { ...state.film, isFavorite };
      }
    });
});

export { film };
