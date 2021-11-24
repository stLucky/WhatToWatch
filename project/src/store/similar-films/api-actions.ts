import { ThunkActionResult } from '../../types/actions';
import {
  loadSimilarRequest,
  loadSimilarSuccess,
  loadSimilarError
} from '../actions';
import {
  APIRoute
} from '../../const';
import { FilmsType } from '../../types/films';
import camelcaseKeys from 'camelcase-keys';

export const fetchSimilarAction = (id: string): ThunkActionResult => async (
  dispatch,
  getState,
  api,
) => {
  dispatch(loadSimilarRequest(true));

  try {
    getState().SIMILAR_FILMS.isSimilarError && dispatch(loadSimilarError(false));

    const { data } = await api.get<FilmsType>(`${APIRoute.Films}/${id}/similar`);
    const normalizedData = camelcaseKeys(data);

    dispatch(loadSimilarSuccess(normalizedData));
  } catch (e) {
    dispatch(loadSimilarError(true));
  } finally {
    dispatch(loadSimilarRequest(false));
  }
};
