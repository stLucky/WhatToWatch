import { useState, ChangeEvent } from 'react';
import Rating from '../rating/rating';

const MAX_NUMBER_RATING = 10;

const ratings = Array.from({ length: MAX_NUMBER_RATING }, (_, i) => i + 1).reverse();

function CommentForm(): JSX.Element {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);

  const handleCommentChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const value = target.value;
    setComment(value);
  };
  const handleRatingChange = (ratingQuantity: number) => {
    setRating(ratingQuantity);
  };
  // eslint-disable-next-line no-console
  console.log(comment, rating);

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {ratings.map((item) => <Rating key={item} rating={item} onChange={handleRatingChange} />)}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={handleCommentChange}
          >
            {comment}
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" onSubmit={(evt) => {

              evt.preventDefault();
              // eslint-disable-next-line no-console
              console.log(evt.target);
            }}
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
