import { ThunkActionResult } from '../../types/actions';
import {
  loadPromoSuccess,
  loadPromoError,
  loadPromoRequest
} from '../actions';
import {
  APIRoute,
  PROMO_ERROR
} from '../../const';
import { FilmType } from '../../types/films';
import camelcaseKeys from 'camelcase-keys';
import { toast } from 'react-toastify';

export const fetchPromoAction = (): ThunkActionResult => async (
  dispatch,
  _,
  api,
) => {
  dispatch(loadPromoRequest(true));

  try {
    const { data } = await api.get<FilmType>(`${APIRoute.Promo}`);
    const normalizedData = camelcaseKeys(data);

    dispatch(loadPromoSuccess(normalizedData));
  } catch (e) {
    dispatch(loadPromoError(true));
    toast.error(PROMO_ERROR);
  } finally {
    dispatch(loadPromoRequest(false));
  }
};
