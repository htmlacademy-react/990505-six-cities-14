import Page from '../../components/page';
import {Locations} from '../../const';
import LocationsList from './locations-list';
import Cities from './cities';
import {
  useAppDispatch,
  useAppSelector
} from '../../store/hooks';
import {fetchOffersAction} from '../../store/api-actions';
import {useEffect, useMemo, useState} from 'react';
import Spinner from '../../components/app/spinner';
import {isUserAuthorized} from '../../store/user-process/selectors';
import {selectCityName, selectOfferDataLoadingStatus, selectOffers} from '../../store/offers-data/selectors';
import {setOffers} from '../../store/offers-data/offers-data';
import {OfferPreviewType} from '../../types/offers-preview';
import CitiesEmpty from './cities-empty';

function Main() {
  const isAuthorizationUser = useAppSelector(isUserAuthorized);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOffersAction());
    return () => {
      dispatch(setOffers([]));
    };
  }, [dispatch, isAuthorizationUser]);

  const selectedCityName = useAppSelector(selectCityName);
  const isOfferDataLoading = useAppSelector(selectOfferDataLoadingStatus);
  const [sortedOffers, setSortedOffers] = useState<OfferPreviewType[]>([]);

  const offers = useAppSelector(selectOffers);
  const defaultOrderSortedOffers = useMemo(() => offers.filter((item) => item.city.name === selectedCityName), [offers, selectedCityName]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setSortedOffers(defaultOrderSortedOffers);
    }
    return () => {
      isMounted = false;
    };
  }, [defaultOrderSortedOffers]);

  if (isOfferDataLoading) {
    return <Spinner />;
  }

  return (
    <Page className="page page--gray page--main" title="6 cities">
      <main className={`page__main page__main--index ${!sortedOffers.length && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList locations={Locations} selectedCityName={selectedCityName} />
          </section>
        </div>
        {sortedOffers.length ?
          <Cities defaultOrderSortedOffers={defaultOrderSortedOffers} sortedOffers={sortedOffers} setSortedOffers={setSortedOffers}/> :
          <CitiesEmpty currentCityName={selectedCityName}/>}
      </main>
    </Page>
  );
}

export default Main;
