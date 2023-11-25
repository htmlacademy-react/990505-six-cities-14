import moment from 'moment/moment';
import {ReviewType} from '../../types/review';
import {offerRatingInPercentage} from '../../utils';

type ReviewProps = {
  review: ReviewType;
}

function Review({review}: ReviewProps) {
  const {avatarUrl, name} = review.user;
  const {comment, date, rating} = review;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${offerRatingInPercentage(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={moment(date).format('YYYY-MM-DD')}>
          {moment(date).format('MMMM YYYY')}
        </time>
      </div>
    </li>
  );
}

export default Review;

