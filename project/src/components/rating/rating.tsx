import { ChangeEvent } from 'react';

type RatingProps = {
  rating: number;
  onChange: (ratingQuantity: number) => void;
};

function Rating({ rating, onChange }: RatingProps): JSX.Element {
  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const value = +target.value;
    onChange(value);
  };

  return (
    <>
      <input
        className="rating__input"
        id={`star-${rating}`}
        type="radio"
        name="rating"
        value={rating}
        onChange={handleChange}
      />
      <label className="rating__label" htmlFor={`star-${rating}`}>
        Rating {rating}
      </label>
    </>
  );
}

export default Rating;
