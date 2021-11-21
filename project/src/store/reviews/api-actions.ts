import { ThunkActionResult } from '../../types/actions';
import {
  redirectToRoute,
  loadReviewsRequest,
  loadReviewsSuccess,
  loadReviewsError,
  sendReviewRequest
} from '../actions';
import {
  APIRoute,
  TRY_AGAIN_ERROR
} from '../../const';
import camelcaseKeys from 'camelcase-keys';
import { toast } from 'react-toastify';
import { ReviewSend, ReviewsType } from '../../types/reviews';

export const fetchReviewsAction = (id: string): ThunkActionResult => async (
  dispatch,
  _,
  api,
) => {
  dispatch(loadReviewsRequest(true));
  try {
    const { data } = await api.get<ReviewsType>(`${APIRoute.Reviews}/${id}`);
    const normalizedData = camelcaseKeys(data);

    dispatch(loadReviewsSuccess(normalizedData));
  } catch (e) {
    dispatch(loadReviewsError(true));
  } finally {
    dispatch(loadReviewsRequest(false));
  }
};

export const fetchSendReviewAction = (
  review: ReviewSend,
  id: string,
): ThunkActionResult => async (dispatch, _, api) => {
  dispatch(sendReviewRequest(true));

  try {
    await api.post<ReviewSend>(`${APIRoute.Reviews}/${id}`, review);
    dispatch(redirectToRoute(`/films/${id}`));
  } catch (e) {
    toast.error(TRY_AGAIN_ERROR);
  } finally {
    dispatch(sendReviewRequest(false));
  }
};
