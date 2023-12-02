import Review from './review';
import {ReviewType} from '../../types/review';
import ReviewsForm from './reviews-form';
import {useAppSelector} from '../../store/hooks';
import {CurrentOfferType} from '../../types/current-offer';
import {isUserAuthorized} from '../../store/user-process/selectors';
import {MAX_REVIEWS_LENGTH} from '../../const';

type ReviewsProps = {
  reviews: ReviewType[];
  offerId: string;
  currentOffer: CurrentOfferType;
  setCurrentOffer: (currentOffer: CurrentOfferType) => void;
}

function Reviews({reviews, offerId, currentOffer, setCurrentOffer}: ReviewsProps) {
  const isAuthorizationUser = useAppSelector(isUserAuthorized);
  const renderReviews = reviews
    .sort((a, b) => b.date > a.date ? 1 : -1)
    .slice(0, MAX_REVIEWS_LENGTH);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {renderReviews.map((review) => <Review key={review.id} review={review} />)}
      </ul>
      {(isAuthorizationUser && offerId) &&
        <ReviewsForm offerId={offerId} currentOffer={currentOffer} setCurrentOffer={setCurrentOffer} />}
    </section>
  );
}

export default Reviews;
