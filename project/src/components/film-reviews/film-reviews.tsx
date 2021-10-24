import { Reviews } from '../../types/reviews';
import FilmReview from '../film-review/film-review';

type ReviewsProps = {
  currentReviews: Reviews;
};

function FilmReviews({ currentReviews }: ReviewsProps): JSX.Element {
  const middleCurrentReviews = Math.round(currentReviews.length / 2) - 1;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {currentReviews.map(
          (review, i) =>
            i <= middleCurrentReviews && (
              <FilmReview key={review.id} review={review} />
            ),
        )}
      </div>
      <div className="film-card__reviews-col">
        {currentReviews.map(
          (review, i) =>
            i > middleCurrentReviews && (
              <FilmReview key={review.id} review={review} />
            ),
        )}
      </div>
    </div>
  );
}

export default FilmReviews;
