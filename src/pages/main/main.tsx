import Page from '../../components/page';
import {Locations} from '../../const';
import LocationsList from './locations-list';
import Cities from './cities';
import {
  useAppDispatch,
  useAppSelector
} from '../../store/hooks';
import {fetchOffersAction} from '../../store/api-actions';
import {useCallback, useEffect, useState} from 'react';
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
  const getDefaultOrderSortedOffers = useCallback(() => offers.filter((item) => item.city.name === selectedCityName), [offers, selectedCityName]);


  useEffect(() => setSortedOffers(getDefaultOrderSortedOffers()), [getDefaultOrderSortedOffers]);
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
          <Cities getDefaultOrderSortedOffers={getDefaultOrderSortedOffers} sortedOffers={sortedOffers} setSortedOffers={setSortedOffers}/> :
          <CitiesEmpty currentCityName={selectedCityName}/>}
      </main>
    </Page>
  );
}

export default Main;
