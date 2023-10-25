import Page from '../../components/page';
import {AuthorizationStatus, SortLocations} from '../../const';
import {OfferType} from '../../types/offers';
import LocationsList from './locationsLlist';
import SortingForm from './sorting-form';
import PlacesCards from '../../components/places-cards/places-cards';

type MainProps = {
  offers: OfferType[];
}

function Main({offers}: MainProps) {
  const locations = [...new Set(offers.map((offer) => offer.city.name))];
  return (
    <Page className="page page--gray page--main" title="6 cities" isAuthorizedUser={AuthorizationStatus.Auth}>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList locations={locations}></LocationsList>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <SortingForm sortLocations={SortLocations}/>
              <PlacesCards offers={offers}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"/>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}

export default Main;
