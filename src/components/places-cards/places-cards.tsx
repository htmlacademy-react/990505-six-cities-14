import {OfferType} from '../../types/offers';
import {JSX} from 'react';
import PlaceCard from './place-card';

type PlacesCardsProps = {
  offers: OfferType[];
}

function PlacesCards({offers}: PlacesCardsProps):JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard key={offer.id} className='cities__card' offer={offer} />))}
    </div>
  );
}

export default PlacesCards;


