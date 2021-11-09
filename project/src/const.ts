export const DEFAULT_GENRE = 'All genres';
export const SHOWN_COUNT_FILMS = 8;
export const MAX_NUMBER_GENRES = 10;
export const ERROR_404 = 404;
export const OTHER_ERRORS = 'OTHER';
export const ANOTHER_TIME_ERROR =
  'Oops... Something went wrong. Try another time';
export const TRY_AGAIN_ERROR = 'Oops... Something went wrong. Try again';

export enum AppRoute {
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  Root = '/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorite = '/favorite',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
}
