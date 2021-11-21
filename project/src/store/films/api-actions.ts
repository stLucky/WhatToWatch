import { ThunkActionResult } from '../../types/actions';
import {
  loadFilmsSuccess,
  loadFilmsRequest,
  loadFilmsError
} from '../actions';
import { APIRoute } from '../../const';
import { FilmsType } from '../../types/films';
import camelcaseKeys from 'camelcase-keys';

export const fetchFilmsAction =
  (): ThunkActionResult => async (dispatch, _, api) => {
    dispatch(loadFilmsRequest(true));

    try {
      const { data } = await api.get<FilmsType>(APIRoute.Films);
      const normalizedData = data.map((film) => camelcaseKeys(film));

      dispatch(loadFilmsSuccess(normalizedData));
    } catch (e) {
      dispatch(loadFilmsError());
    } finally {
      dispatch(loadFilmsRequest(false));
    }
  };
