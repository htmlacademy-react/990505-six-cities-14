import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import Page from '../../components/page';
import {AuthorizationStatus} from '../../const';
import {OfferType} from '../../types/offers';
import {reviews} from '../../mocks/review';
import Reviews from '../../components/app/reviews';
import PlaceCard from '../../components/places-cards/place-card';
import NotFoundPage from '../not-found-page/not-found-page';
import ReviewsForm from './reviews-form';
import {addPluralEnding} from '../../utils';
import CitiesMap from '../../components/app/citiesMap';
import {CityType} from '../../types/city';

type OfferProps = {
  offers: OfferType[];
}

function Offer({ offers }: OfferProps) {
  const { offerId } = useParams();
  const currentOffer = offers.find((item) => item.id === Number(offerId));

  const currentCity = currentOffer?.city || {} as CityType;

  const nearOffers = useMemo<OfferType[]>(() => {
    if (!currentOffer) {
      return [];
    }
    const nearPlace: OfferType[] = [];
    offers.forEach((item) => {
      if (nearPlace.length < 3 && item.city.name === currentOffer.city.name) {
        nearPlace.push(item);
      }
    });
    return nearPlace;
  }, [offers, currentOffer]);

  if (!currentOffer) {
    return (
      <NotFoundPage />
    );
  }

  const {images, goods, isPremium, rating, type, bedrooms, maxAdults, price, description, title, host}: OfferType = currentOffer;

  return (
    <Page className="page" title="6 cities: offer" isAuthorizedUser={AuthorizationStatus.Auth}>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((img) => (
                <div className="offer__image-wrapper" key={img}>
                  <img
                    className="offer__image"
                    src={img}
                    alt="Photo studio"
                  />
                </div>)
              )}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && <div className="offer__mark"><span>Premium</span></div> }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: '80%' }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedroom{addPluralEnding(bedrooms)}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} maxAdult{addPluralEnding(maxAdults)}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&#8216;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((item) => (
                    <li className="offer__inside-item" key={item}>
                      {item}
                    </li>))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">{title}</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper ${host.isPro && 'offer__avatar-wrapper--pro'}`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  <span className="offer__user-status">{host.isPro && 'Pro'}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <Reviews reviews={reviews}/>
              <ReviewsForm />
            </div>
          </div>
          <CitiesMap offers={nearOffers} city={currentCity} mapBlock={'offer'}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((nearOffer) => (
                <PlaceCard key={nearOffer.id} offer={nearOffer} block='near-places' size='large'/>))}
            </div>
          </section>

        </div>
      </main>
    </Page>
  );
}

export default Offer;
