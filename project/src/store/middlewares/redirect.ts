import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { reducer } from '../reducer';
import { ActionTypes } from '../../types/actions';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action) => {
    if (action.type === ActionTypes.RedirectToRoute) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
