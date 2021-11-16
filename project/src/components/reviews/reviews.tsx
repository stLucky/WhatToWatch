import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { fetchReviewsAction } from '../../store/api-actions';
import Review from '../review/review';
import Loader from 'react-loader-spinner';
import styles from './reviews.module.scss';
import { ANOTHER_TIME_ERROR } from '../../const';
import { getErrorReviewsStatus, getLoadingReviewsStatus, getReviews } from '../../store/reviews/selectors';

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
      <div className={styles.reviewsWrap}>
        <Loader type="Oval" color="#180202" height={40} width={40} />
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
