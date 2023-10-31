import {OfferType} from '../../types/offers';
import {useState} from 'react';
import PlaceCard from './place-card';
import SortingForm from '../../pages/main/sorting-form';
import {SortLocations} from '../../const';
import {OffersPreviewType} from '../../types/offers-preview';
import CitiesMap from '../app/citiesMap';
import {addPluralEnding} from '../../utils';

type PlacesCardsProps = {
  offers: OfferType[];
}

function PlacesCards({offers}: PlacesCardsProps) {
  const [, setHoveredOfferId] = useState<
    OffersPreviewType['id'] | null
  >(null);

  function handleCardHover(offerId: OffersPreviewType['id'] | null) {
    setHoveredOfferId(offerId);
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} place{addPluralEnding(offers.length)} to stay in Amsterdam</b>
          <SortingForm sortLocations={SortLocations}/>
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
              <PlaceCard
                key={offer.id}
                offer={offer}
                block='cities'
                size='large'
                onCardHover={handleCardHover}
              />))}
          </div>
        </section>
        <div className="cities__right-section">
          <CitiesMap />
        </div>
      </div>
    </div>
  );
}

export default PlacesCards;
