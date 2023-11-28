import Review from '../../pages/offer/review';
import {ReviewType} from '../../types/review';
import ReviewsForm from '../../pages/offer/reviews-form';
import {isUserAuthorized, useAppSelector} from '../../store/hooks';
import {CurrentOfferType} from '../../types/current-offer';

type ReviewsProps = {
  reviews: ReviewType[];
  offerId: string;
  currentOffer: CurrentOfferType;
  setCurrentOffer: (currentOffer: CurrentOfferType) => void;
}

function Reviews({reviews, offerId, currentOffer, setCurrentOffer}: ReviewsProps) {
  const isAuthorizationUser = useAppSelector(isUserAuthorized);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Review key={review.id} review={review} />)}
      </ul>
      {(isAuthorizationUser && offerId) &&
        <ReviewsForm offerId={offerId} currentOffer={currentOffer} setCurrentOffer={setCurrentOffer} />}
    </section>
  );
}

export default Reviews;
