import { datatype, lorem, name, date } from 'faker';

import { ReviewType, ReviewsType } from '../types/reviews';
import { User } from '../types/reviews';

const REVIEWS_COUNT = 8;

const makeFakeUser = (): User => ({
  id: datatype.number(),
  name: name.findName(),
});

export const makeFakeReview = (): ReviewType => ({
  id: datatype.number(),
  user: makeFakeUser(),
  rating: datatype.number(),
  comment: lorem.sentences(),
  date: date.recent().toString(),
});

export const makeFakeReviews = (): ReviewsType => new Array(REVIEWS_COUNT)
  .fill(null)
  .map(() => makeFakeReview());
