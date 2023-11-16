import {useState} from 'react';
import SortingForm from './sorting-form';
import {OfferPreviewType} from '../../types/offers-preview';
import CitiesMap from '../../components/app/citiesMap';
import {addPluralEnding} from '../../utils';
import 'leaflet/dist/leaflet.css';
import PlacesCards from '../../components/places-cards/places-cards';
import {selectCity, selectSortedOffers, useAppSelector} from '../../store/hooks';

function Cities() {

  const selectedCityName = useAppSelector(selectCity);
  const sortedOffers = useAppSelector(selectSortedOffers);
  const currentCity = sortedOffers[0]?.city;
  const [selectedOffer, setHoveredOffer] = useState<
    OfferPreviewType | null
  >(null);

  function handleCardHover(offerId: string | null) {
    const currentOffer = sortedOffers.find((offer) => offer.id === offerId) || null;
    setHoveredOffer(currentOffer);
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortedOffers.length} place{addPluralEnding(sortedOffers.length)} to stay in {selectedCityName}</b>
          <SortingForm />
          <PlacesCards offers={sortedOffers} onCardHover={handleCardHover} size={'large'} block={'cities'}/>
        </section>
        <div className="cities__right-section">
          <CitiesMap offers={sortedOffers} currentCity={currentCity} selectedOffer={selectedOffer} mapBlock={'cities'}/>
        </div>
      </div>
    </div>
  );
}

export default Cities;