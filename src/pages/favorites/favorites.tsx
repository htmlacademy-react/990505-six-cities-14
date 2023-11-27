import {useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import Page from '../../components/page';
import PlaceCard from '../../components/places-cards/place-card';
import {selectOfferDataLoadingStatus, selectOffers, useAppDispatch, useAppSelector} from '../../store/hooks';
import {OfferPreviewType} from '../../types/offers-preview';
import {fetchFavoriteOffersAction,} from '../../store/api-actions';
import {setOffers} from '../../store/action';
import Spinner from '../../components/app/spinner';

function Favorites() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
    return () => {
      dispatch(setOffers([]));
    };
  }, [dispatch]);

  const offers = useAppSelector(selectOffers);
  const isOfferDataLoading = useAppSelector(selectOfferDataLoadingStatus);

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


  if (isOfferDataLoading) {
    return <Spinner />;
  }

  return (
    <Page className="page" title="6 cities: favorites">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteCities.map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
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
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </Page>
  );
}

export default Favorites;
