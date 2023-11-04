import Page from '../../components/page';
import {AuthorizationStatus} from '../../const';
import {OfferType} from '../../types/offers';
import LocationsList from './locationsLlist';
import Cities from './cities';

type MainProps = {
  offers: OfferType[];
}

function Main({ offers }: MainProps) {
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
        <Cities offers={offers}/>
      </main>
    </Page>
  );
}

export default Main;
