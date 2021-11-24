import { ReviewType } from '../../types/reviews';
import { getFormattedDate } from '../../utils';

type ReviewProps = {
  review: ReviewType;
};

function Review({ review }: ReviewProps): JSX.Element {
  return (
    <div className="review" data-testid="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={review.date}>
            {getFormattedDate(review.date)}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default Review;
