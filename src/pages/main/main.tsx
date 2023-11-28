import Page from '../../components/page';
import {Locations} from '../../const';
import LocationsList from './locations-list';
import Cities from './cities';
import {
  isUserAuthorized,
  selectCityName,
  selectOfferDataLoadingStatus,
  useAppDispatch,
  useAppSelector
} from '../../store/hooks';
import {fetchOffersAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {setOffers} from '../../store/action';
import Spinner from '../../components/app/spinner';


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

  if (isOfferDataLoading) {
    return <Spinner />;
  }
  return (
    <Page className="page page--gray page--main" title="6 cities">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList locations={Locations} selectedCityName={selectedCityName} />
          </section>
        </div>
        <Cities />
      </main>
    </Page>
  );
}

export default Main;
