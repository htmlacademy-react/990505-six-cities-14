import {MouseEvent, useState} from 'react';
import {MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, ratingMap} from '../../const';
import Rating from './rating';
import {postOfferReview} from '../../store/api-actions';
import {CurrentOfferType} from '../../types/current-offer';
import {ReviewType} from '../../types/review';

type ReviewsFormProps = {
  offerId: string;
  currentOffer: CurrentOfferType;
  setCurrentOffer: (currentOffer: CurrentOfferType) => void;
}

function ReviewsForm({offerId, currentOffer, setCurrentOffer}: ReviewsFormProps) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [isReviewSending, setIsReviewSending] = useState(false);
  const reviewData = {
    comment: comment,
    rating: +rating,
  };
  const isValid = comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating !== '';

  const handleClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setIsReviewSending(true);
    postOfferReview(offerId, reviewData).then((review: ReviewType) => {
      setCurrentOffer({...currentOffer, reviews: [review, ...currentOffer.reviews]});
      setComment('');
      setRating('');
    })
      .catch(() => true)
      .finally(() => setIsReviewSending(false));
  };
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, title]) => (
            <Rating key={score} score={score} title={title} rating={rating} setRating={setRating} disabled={isReviewSending} />
          ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        disabled={isReviewSending}
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
          disabled={!isValid || isReviewSending}
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;

