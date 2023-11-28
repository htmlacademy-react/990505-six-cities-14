import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import Page from '../../components/page';
import {selectOfferDataLoadingStatus, selectOffers, useAppDispatch, useAppSelector} from '../../store/hooks';
import {fetchFavoriteOffersAction,} from '../../store/api-actions';
import {setOffers} from '../../store/action';
import Spinner from '../../components/app/spinner';
import FavoriteList from './favorite-list';
import FavoriteListEmpty from './favorite-list-empty';

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
    <Page className="page" title="6 cities: favorites">
      <main className="page__main page__main--favorites">
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
