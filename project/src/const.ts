export const DEFAULT_GENRE = 'All genres';
export const SHOWN_COUNT_FILMS = 8;
export const MAX_NUMBER_GENRES = 10;
export const MAX_VIDEO_PROGRESS = 100;

export const ERROR_404 = 404;
export const ERROR_401 = 401;
export const OTHER_ERRORS = 'OTHER';
export const ANOTHER_TIME_ERROR =
  'Oops... Something went wrong. Try another time';
export const TRY_AGAIN_ERROR = 'Oops... Something went wrong. Try again';
export const AUTH_INFO = 'Hello friend! Don\'t forget log in to the system!';
export const AUTH_ERROR = 'Login required!';
export const PROMO_ERROR = 'Failed to upload promo movie. Try another time';

export const SUCCESS_RESPONSE_CODE = 200;
export const NO_CONTENT_RESPONSE_CODE = 204;

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

export enum FavoriteStatus {
  On = 1,
  Off = 0
}
