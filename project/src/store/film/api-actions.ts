import { ThunkActionResult } from '../../types/actions';
import {
  loadFilmRequest,
  loadFilmSuccess,
  loadFilmError
} from '../actions';
import {
  APIRoute,
  ERROR_404,
  OTHER_ERRORS
} from '../../const';
import { FilmType } from '../../types/films';
import camelcaseKeys from 'camelcase-keys';

export const fetchFilmAction = (id: string): ThunkActionResult => async (
  dispatch,
  getState,
  api,
) => {
  dispatch(loadFilmRequest(true));

  try {
    getState().FILM.filmError && dispatch(loadFilmError(''));

    const { data } = await api.get<FilmType>(`${APIRoute.Films}/${id}`);
    const normalizedData = camelcaseKeys(data);

    dispatch(loadFilmSuccess(normalizedData));
  } catch (e) {
    e === ERROR_404
      ? dispatch(loadFilmError(ERROR_404.toString()))
      : dispatch(loadFilmError(OTHER_ERRORS));
  } finally {
    dispatch(loadFilmRequest(false));
  }
};
