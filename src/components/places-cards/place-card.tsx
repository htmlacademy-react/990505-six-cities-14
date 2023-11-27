import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {OfferPreviewType} from '../../types/offers-preview';
import {capitalize, offerRatingInPercentage} from '../../utils';
import {CardsSizeType} from '../../types/card-size';
import BookmarkButton from './bookmark-button';

type PlaceCardProps = {
  offer: OfferPreviewType;
  block: 'favorites' | 'cities' | 'near-places';
  size?: CardsSizeType;
  onCardHover?: (offerId: OfferPreviewType['id'] | null) => void;
}

const sizeMap: Record<CardsSizeType, { width: string; height: string }> = {
  small: { width: '150', height: '110' },
  large: { width: '260', height: '200' },
};

function PlaceCard({offer, block, size = 'large', onCardHover}: PlaceCardProps) {
  const {id, price, isPremium, rating, title, type, previewImage, isFavorite} = offer;

  function handleMouseEnter() {
    onCardHover?.(id);
  }

  function handleMouseLeave() {
    onCardHover?.(null);
  }
  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (<div className="place-card__mark"><span>Premium</span></div>)}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            {...sizeMap[size]}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${block}__card-info'} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton size={'small'} currentOffer={offer} favoriteStatus={isFavorite} offerId={id} block={'place-card'} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offerRatingInPercentage(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
