import { ReviewsType } from '../../types/reviews';
import Review from '../review/review';

type ReviewsProps = {
  currentReviews: ReviewsType;
};

function Reviews({ currentReviews }: ReviewsProps): JSX.Element {
  const middleCurrentReviews = Math.round(currentReviews.length / 2) - 1;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {currentReviews.map(
          (review, i) =>
            i <= middleCurrentReviews && (
              <Review key={review.id} review={review} />
            ),
        )}
      </div>
      <div className="film-card__reviews-col">
        {currentReviews.map(
          (review, i) =>
            i > middleCurrentReviews && (
              <Review key={review.id} review={review} />
            ),
        )}
      </div>
    </div>
  );
}

export default Reviews;
