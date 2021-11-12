import { ChangeEvent, memo } from 'react';

type RatingProps = {
  rating: number;
  checked: number | null;
  onChange: (ratingQuantity: number) => void;
};

function Rating({ rating, checked, onChange }: RatingProps): JSX.Element {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
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
        checked={rating === checked}
        onChange={handleChange}
      />
      <label className="rating__label" htmlFor={`star-${rating}`}>
        Rating {rating}
      </label>
    </>
  );
}

export default memo(Rating);
