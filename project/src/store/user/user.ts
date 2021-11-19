import { AuthorizationStatus } from '../../const';
import { AuthUser } from '../../types/auth-data';
import { UserProcess } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import {
  authorizationRequest,
  checkAuthRequest,
  loadUser,
  requireAuthorization,
  requireLogout
} from '../actions';

const initialState: UserProcess = {
  user: {} as AuthUser,
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuthLoading: false,
  isCheckAuthLoading: false,
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(authorizationRequest, (state, action) => {
      state.isAuthLoading = action.payload;
    })
    .addCase(checkAuthRequest, (state, action) => {
      state.isCheckAuthLoading = action.payload;
    });
});

export { user };
