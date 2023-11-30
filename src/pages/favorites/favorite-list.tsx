import PlaceCard from '../../components/places-cards/place-card';
import {useMemo} from 'react';
import {OfferPreviewType} from '../../types/offers-preview';

type FavoriteListProps = {
  offers: OfferPreviewType[];
}
function FavoriteList({offers} : FavoriteListProps) {

  const {
    favoriteOffers,
    favoriteCities
  } = useMemo<{ favoriteOffers: Record<string, OfferPreviewType[]>; favoriteCities: string[] }>(() => {
    const sortedOffers: Record<string, OfferPreviewType[]> = {};
    offers.forEach((item) => {
      sortedOffers[item.city.name] = sortedOffers[item.city.name] || [];
      sortedOffers[item.city.name].push(item);
    });
    return {
      favoriteOffers: sortedOffers,
      favoriteCities: Object.keys(sortedOffers)
    };
  }, [offers]);
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favoriteCities.map((city) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#" >
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {favoriteOffers[city].map((item) => (
                <PlaceCard key={item.id} offer={item} block='favorites' size='small'/>))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FavoriteList;
