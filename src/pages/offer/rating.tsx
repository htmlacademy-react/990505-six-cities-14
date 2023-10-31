import {ChangeEvent, Fragment} from 'react';

type RatingProps = {
  score: string;
  title: string;
  rating: string;
  setRating: (rating: string) => void;
}

function Rating({score, title, rating, setRating}: RatingProps) {
  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.target.value);
  }
  return (
    <Fragment key={score}>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating}
        id={`${score}-stars`}
        type="radio"
        checked={rating === score}
        onChange={handleInputChange}
      />
      <label
        htmlFor={`${score}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </Fragment>
  );
}

export default Rating;
