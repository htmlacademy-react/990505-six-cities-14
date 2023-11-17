import Page from '../../components/page';
import {AuthorizationStatus, Locations} from '../../const';
import LocationsList from './locationsLlist';
import Cities from './cities';
import {selectCity, selectOfferDataLoadingStatus, useAppSelector} from '../../store/hooks';
import Spinner from '../../components/app/spinner';


function Main() {
  const selectedCityName = useAppSelector(selectCity);
  const isOfferDataLoading = useAppSelector(selectOfferDataLoadingStatus);

  if (isOfferDataLoading) {
    return <Spinner />;
  }
  return (
    <Page className="page page--gray page--main" title="6 cities" isAuthorizedUser={AuthorizationStatus.Auth}>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList locations={Locations} selectedCityName={selectedCityName}></LocationsList>
          </section>
        </div>
        <Cities />
      </main>
    </Page>
  );
}

export default Main;
