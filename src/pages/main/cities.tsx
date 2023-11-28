import {useCallback, useEffect, useState} from 'react';
import SortingForm from './sorting-form';
import {OfferPreviewType} from '../../types/offers-preview';
import CitiesMap from '../../components/app/cities-map';
import {addPluralEnding} from '../../utils';
import 'leaflet/dist/leaflet.css';
import PlacesCards from '../../components/places-cards/places-cards';
import {selectCityName, selectOffers, useAppSelector} from '../../store/hooks';
import CitiesEmpty from './cities-empty';

function Cities() {
  const [sortedOffers, setSortedOffers] = useState<OfferPreviewType[]>([]);
  const [selectedOffer, setHoveredOffer] = useState<OfferPreviewType | null>(null);
  const selectedCityName = useAppSelector(selectCityName);
  const offers = useAppSelector(selectOffers);
  const getDefaultOrderSortedOffers = useCallback(() => offers.filter((item) => item.city.name === selectedCityName), [offers, selectedCityName]);


  useEffect(() => setSortedOffers(getDefaultOrderSortedOffers()), [getDefaultOrderSortedOffers]);

  if (!sortedOffers[0]) {
    return null;
  }
  const currentCity = sortedOffers[0].city;

  function handleCardHover(offerId: string | null) {
    const currentOffer = sortedOffers.find((offer) => offer.id === offerId) || null;
    setHoveredOffer(currentOffer);
  }
  if (!sortedOffers) {
    return <CitiesEmpty currentCityName={currentCity.name}/>;
  }
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortedOffers.length} place{addPluralEnding(sortedOffers.length)} to stay in {selectedCityName}</b>
          <SortingForm sortedOffers={sortedOffers} setSortedOffers={setSortedOffers} getDefaultOrderSortedOffers={getDefaultOrderSortedOffers} />
          <PlacesCards offers={sortedOffers} onCardHover={handleCardHover} size='large' block='cities' />
        </section>
        <div className="cities__right-section">
          <CitiesMap offers={sortedOffers} currentCity={currentCity} selectedOffer={selectedOffer} mapBlock='cities' />
        </div>
      </div>
    </div>
  );
}

export default Cities;
