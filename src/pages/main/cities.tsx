import {OfferType} from '../../types/offers';
import {useMemo, useState} from 'react';
import SortingForm from './sorting-form';
import {SortLocations} from '../../const';
import {OfferPreviewType} from '../../types/offers-preview';
import CitiesMap from '../../components/app/citiesMap';
import {addPluralEnding} from '../../utils';
import 'leaflet/dist/leaflet.css';
import {CityType} from '../../types/city';
import PlacesCards from '../../components/places-cards/places-cards';

type CitiesProps = {
  offers: OfferType[];
}

function Cities({offers}: CitiesProps) {
  const currentCity = offers.find((offer) => offer.city.name === 'Amsterdam')?.city || {} as CityType;
  const sortedOffers = useMemo<OfferType[]>(() => offers.filter((item) => item.city.name === 'Amsterdam'), [offers]);

  const [selectedOffer, setHoveredOffer] = useState<
    OfferPreviewType | null
  >(null);

  function handleCardHover(offerId: number | null) {
    const currentOffer = sortedOffers.find((offer) => offer.id === offerId) || null;
    setHoveredOffer(currentOffer);
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} place{addPluralEnding(offers.length)} to stay in Amsterdam</b>
          <SortingForm sortLocations={SortLocations}/>
          <PlacesCards offers={sortedOffers} onCardHover={handleCardHover} size={'large'} block={'cities'}/>
        </section>
        <div className="cities__right-section">
          <CitiesMap offers={sortedOffers} city={currentCity} selectedOffer={selectedOffer} mapBlock={'cities'}/>
        </div>
      </div>
    </div>
  );
}

export default Cities;
