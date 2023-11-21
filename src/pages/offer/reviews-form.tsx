import {useState} from 'react';
import {MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, ratingMap} from '../../const';
import Rating from './rating';
import {useAppDispatch} from '../../store/hooks';
import {postReviewAction} from '../../store/api-actions';

type ReviewsFormProps = {
  offerId: string;
}

function ReviewsForm({offerId}: ReviewsFormProps) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const reviewData = {
    comment: comment,
    rating: +rating,
  };
  const isValid = comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating !== '';

  const dispatch = useAppDispatch();

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, title]) => (
            <Rating key={score} score={score} title={title} rating={rating} setRating={setRating} />
          ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={(evt) => setComment(evt.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(postReviewAction({offerId, reviewData}));
            setComment('');
            setRating('');
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;

