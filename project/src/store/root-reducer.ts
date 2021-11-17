import { combineReducers } from 'redux';
import { films } from './films/films';
import { upState } from './up-state/up-state';
import { reviews } from './reviews/reviews';
import { user } from './user/user';

export enum NameSpace {
  Films = 'FILMS',
  Reviews = 'REVIEWS',
  UpState = 'UP_STATE',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Films]: films,
  [NameSpace.Reviews]: reviews,
  [NameSpace.UpState]: upState,
  [NameSpace.User]: user,
});

export type RootState = ReturnType<typeof rootReducer>;
