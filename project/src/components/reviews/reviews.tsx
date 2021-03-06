import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Review from '../review/review';
import Loader from 'react-loader-spinner';
import styles from './reviews.module.scss';
import { ANOTHER_TIME_ERROR } from '../../const';
import {
  getErrorReviewsStatus,
  getLoadingReviewsStatus,
  getReviews
} from '../../store/reviews/selectors';
import { fetchReviewsAction } from '../../store/reviews/api-actions';

const LOADER_WIDTH = 40;
const LOADER_HEIGHT = 40;

function Reviews(): JSX.Element {
  const reviews = useSelector(getReviews);
  const isReviewsLoading = useSelector(getLoadingReviewsStatus);
  const isReviewsError = useSelector(getErrorReviewsStatus);
  const dispatch = useDispatch();

  const { id }: { id: string } = useParams();
  const middleReviews = Math.round(reviews.length / 2) - 1;

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchReviewsAction(id));
  }, [id, dispatch]);

  if (isReviewsLoading) {
    return (
      <div className={styles.reviewsWrap} data-testid="loader">
        <Loader type="Oval" color="#180202" height={LOADER_HEIGHT} width={LOADER_WIDTH} />
      </div>
    );
  }

  if (isReviewsError) {
    return (
      <div className={styles.reviewsWrap}>
        <p className={styles.reviewsText}>{ANOTHER_TIME_ERROR}</p>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className={styles.reviewsWrap}>
        <p className={styles.reviewsText}>So far, no one has left a review</p>
      </div>
    );
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map(
          (review, i) =>
            i <= middleReviews && <Review key={review.id} review={review} />,
        )}
      </div>
      <div className="film-card__reviews-col">
        {reviews.map(
          (review, i) =>
            i > middleReviews && <Review key={review.id} review={review} />,
        )}
      </div>
    </div>
  );
}

export default Reviews;
