import { useState, ChangeEvent, FormEvent } from 'react';
import Rating from '../rating/rating';
import { connect, ConnectedProps } from 'react-redux';
import { fetchSendReviewAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/actions';
import { useParams } from 'react-router-dom';
import { State } from '../../types/state';
import Loader from 'react-loader-spinner';
import { ReviewSend } from '../../types/reviews';
import cn from 'classnames';
import styles from './comment-form.module.scss';

const MAX_NUMBER_RATING = 10;

const ratings = Array.from(
  { length: MAX_NUMBER_RATING },
  (_, i) => i + 1,
).reverse();

const mapStateToProps = ({ isSendReviewLoading }: State) => ({
  isSendReviewLoading,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSendReview(review: ReviewSend, id: number) {
    dispatch(fetchSendReviewAction(review, id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CommentForm({
  isSendReviewLoading,
  onSendReview,
}: PropsFromRedux): JSX.Element {
  const { id }: { id: string } = useParams();

  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);

  const isDisabledForm =
    comment === '' ||
    comment.length < 50 ||
    comment.length > 400 ||
    !rating ||
    isSendReviewLoading;

  const handleCommentChange = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value);
  };

  const handleRatingChange = (ratingQuantity: number) => {
    setRating(ratingQuantity);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isDisabledForm) {
      onSendReview({ rating, comment }, +id);
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

export { CommentForm };

export default connector(CommentForm);
