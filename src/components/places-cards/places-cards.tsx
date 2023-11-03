import PlaceCard from './place-card';
import {OfferPreviewType} from '../../types/offers-preview';
import {OfferType} from '../../types/offers';
import {CardsImageSize} from '../../types/image';

type PlacesCardsProps = {
  offers: OfferType[] | OfferPreviewType[];
  block: 'favorites' | 'cities' | 'near-places';
  size: CardsImageSize;
  onCardHover?: (offerId: OfferPreviewType['id'] | null) => void;
}
function PlacesCards ({offers, size, block, onCardHover}: PlacesCardsProps) {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} block={block} size={size} onCardHover={onCardHover}/>))}
    </div>
  );
}

export default PlacesCards;
