import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import {State} from '../../types/state';
import { ActionTypes } from '../../types/actions';

export const redirect: Middleware<unknown, State> =
  (_store) => (next) => (action) => {
    if (action.type === ActionTypes.RedirectToRoute) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
