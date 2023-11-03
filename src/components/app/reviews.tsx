import {ReviewType} from '../../types/review';
import Review from '../../pages/offer/review';

type OfferProps = {
  reviews: ReviewType[];
}

function Reviews({ reviews }: OfferProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Review key={review.id} review={review} />)}
      </ul>
    </section>
  );
}

export default Reviews;
