import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import Page from '../../components/page';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {fetchFavoriteOffersAction,} from '../../store/api-actions';
import Spinner from '../../components/app/spinner';
import FavoriteList from './favorite-list';
import FavoriteListEmpty from './favorite-list-empty';
import {setOffers} from '../../store/offers-data/offers-data';
import {selectOfferDataLoadingStatus, selectOffers} from '../../store/offers-data/selectors';

function Favorites() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
    return () => {
      dispatch(setOffers([]));
    };
  }, [dispatch]);

  const offers = useAppSelector(selectOffers).filter((item) => item.isFavorite);
  const isOfferDataLoading = useAppSelector(selectOfferDataLoadingStatus);

  if (isOfferDataLoading) {
    return <Spinner />;
  }

  return (
    <Page className={`page ${!offers.length && 'page--favorites-empty'}`} title="6 cities: favorites">
      <main className={`page__main page__main--favorites ${!offers.length && 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {offers.length ? <FavoriteList offers={offers} /> : <FavoriteListEmpty /> }
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
