import { ThunkActionResult } from '../../types/actions';
import {
  changeFavoriteStatus,
  loadMyListRequest,
  loadMyListError,
  loadMyListSuccess
} from '../actions';
import {
  APIRoute,
  TRY_AGAIN_ERROR,
  FavoriteStatus,
  ERROR_401,
  AUTH_ERROR
} from '../../const';
import { FilmsType, FilmType } from '../../types/films';
import camelcaseKeys from 'camelcase-keys';
import { toast } from 'react-toastify';

export const fetchMyListAction = (): ThunkActionResult => async (
  dispatch,
  _,
  api,
) => {
  dispatch(loadMyListRequest(true));

  try {
    const { data } = await api.get<FilmsType>(`${APIRoute.Favorite}`);
    const normalizedFilms = camelcaseKeys(data);
    dispatch(loadMyListSuccess(normalizedFilms));
  } catch (e) {
    dispatch(loadMyListError(true));
  } finally {
    dispatch(loadMyListRequest(false));
  }
};

export const fetchFavoriteStatusAction = (
  id: string,
  status: FavoriteStatus,
): ThunkActionResult => async (dispatch, _, api) => {
  try {
    const { data } = await api.post<FilmType>(
      `${APIRoute.Favorite}/${id}/${status}`,
    );
    const normalizedFilm = camelcaseKeys(data);

    dispatch(changeFavoriteStatus(normalizedFilm));
  } catch (e) {
    e === ERROR_401 ? toast.error(AUTH_ERROR) : toast.error(TRY_AGAIN_ERROR);
  }
};
