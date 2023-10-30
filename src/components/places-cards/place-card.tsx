import {JSX} from 'react';
import {Link} from 'react-router-dom';
import {AppRouter} from '../../const';
import {OffersPreviewType} from '../../types/offers-preview';

type CardsImageSize = 'small' | 'large'

type PlaceCardProps = {
  offer: OffersPreviewType;
  block: 'favorites' | 'cities' | 'near-places';
  size?: CardsImageSize;
  onCardHover?: (offerId: OffersPreviewType['id'] | null) => void;
}

const sizeMap: Record<CardsImageSize,{ width: string; height: string }> = {
  small: { width: '150', height: '110' },
  large: { width: '260', height: '200' },
};

function PlaceCard({ offer, block, size = 'large', onCardHover}: PlaceCardProps): JSX.Element {
  const { id, price, isPremium, rating, title, type, previewImage, isFavorite} = offer;
  const offerRatingInPercentage = String(Math.round(rating) / 5 * 100);

  function handleMouseEnter() {
    onCardHover?.(id);
  }

  function handleMouseLeave() {
    onCardHover?.(null);
  }

  return(
    <article
      className={`${block}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (<div className="place-card__mark"><span>Premium</span></div>)}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRouter.Offer}/${id}`}>
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
          <button className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offerRatingInPercentage}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRouter.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{`${type[0].toUpperCase()}${type.slice(1)}`}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
