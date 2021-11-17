import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Rating from '../rating/rating';
import { fetchSendReviewAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import cn from 'classnames';
import styles from './comment-form.module.scss';
import { getLoadingSendReviewStatus } from '../../store/reviews/selectors';

const MAX_NUMBER_RATING = 10;
const MIN_LENGTH_COMMENT = 50;
const MAX_LENTGH_COMMENT = 400;

const ratings = Array.from(
  { length: MAX_NUMBER_RATING },
  (_, i) => i + 1,
).reverse();

function CommentForm(): JSX.Element {
  const isSendReviewLoading = useSelector(getLoadingSendReviewStatus);
  const dispatch = useDispatch();

  const { id }: { id: string } = useParams();

  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);

  const isDisabledForm =
    comment === '' ||
    comment.length < MIN_LENGTH_COMMENT ||
    comment.length > MAX_LENTGH_COMMENT ||
    !rating ||
    isSendReviewLoading;

  const handleCommentChange = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value);
  };

  const handleRatingChange = useCallback(
    (ratingQuantity: number) => setRating(ratingQuantity),
    [],
  );

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isDisabledForm) {
      dispatch(fetchSendReviewAction({ rating, comment }, id));
    }
  };

  const formClasses = cn('add-review', styles.wrap);

  if (isSendReviewLoading) {
    return (
      <div className={formClasses}>
        <Loader type="Oval" color="#180202" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {ratings.map((item) => (
              <Rating
                key={item}
                rating={item}
                checked={rating}
                onChange={handleRatingChange}
              />
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={handleCommentChange}
            value={comment}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={isDisabledForm}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
