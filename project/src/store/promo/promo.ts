import { createReducer } from '@reduxjs/toolkit';
import { FilmType } from '../../types/films';
import { Promo } from '../../types/state';
import { changeFavoriteStatus, loadPromoError, loadPromoRequest, loadPromoSuccess } from '../actions';

const initialState: Promo = {
  promo: {} as FilmType,
  isPromoLoading: false,
  isPromoError: false,
};

const promo = createReducer(initialState, (builder) => {
  builder
    .addCase(loadPromoRequest, (state, action) => {
      state.isPromoLoading = action.payload;
    })
    .addCase(loadPromoSuccess, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(loadPromoError, (state) => {
      state.isPromoError = true;
    })
    .addCase(changeFavoriteStatus, (state, { payload: { id, isFavorite } }) => {
      if (state.promo.id === id) {
        state.promo = { ...state.promo, isFavorite };
      }
    });
});

export { promo };
