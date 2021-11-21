import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { api } from './api';

const middlewares = [thunk.withExtraArgument(api)];

export const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

export const makeMockStore = (): ReturnType<typeof mockStore> => mockStore();
