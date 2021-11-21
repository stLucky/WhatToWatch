import { createReducer } from '@reduxjs/toolkit';
import { Favorites } from '../../types/state';
import { loadMyListError, loadMyListRequest, loadMyListSuccess } from '../actions';

const initialState: Favorites = {
  myList: [],
  isMyListLoading: false,
  isMyListError: false,
};

const favorites = createReducer(initialState, (builder) => {
  builder
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

export { favorites };

