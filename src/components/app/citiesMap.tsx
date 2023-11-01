import {OfferType} from '../../types/offers';
import {useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap';
import {CityType} from '../../types/city';
import * as leaflet from 'leaflet';

type CitiesMapProps = {
  offers: OfferType[];
  city: CityType;
}

function CitiesMap({offers, city}: CitiesMapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          })
          .addTo(map);
      });
    }
  }, [map, offers]);

  return (
    <section className="cities__map map" ref={mapRef}/>
  );
}

export default CitiesMap;
