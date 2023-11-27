import {useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap';
import {CityType} from '../../types/city';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const';
import {Icon, layerGroup, Marker} from 'leaflet';
import {OfferPreviewType} from '../../types/offers-preview';
import {OfferType} from '../../types/offers';

type CitiesMapProps = {
  offers: OfferType[] | OfferPreviewType[];
  currentCity: CityType;
  selectedOffer?: OfferPreviewType | null;
  mapBlock: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


function CitiesMap({offers, currentCity, selectedOffer, mapBlock}: CitiesMapProps) {

  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });
        marker
          .setIcon(
            selectedOffer && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);

        map.flyTo(
          [
            currentCity.location.latitude,
            currentCity.location.longitude,
          ],
          currentCity.location.zoom
        );
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, currentCity]);

  return (
    <section className={`${mapBlock}__map map`} ref={mapRef}/>
  );
}

export default CitiesMap;
