import {useEffect, useState} from 'react';
import Page from '../../components/page';
import {OfferType} from '../../types/offers';
import Reviews from '../../components/app/reviews';
import ReviewsForm from './reviews-form';
import {addPluralEnding} from '../../utils';
import CitiesMap from '../../components/app/citiesMap';
import PlacesCards from '../../components/places-cards/places-cards';
import {isUserAuthorized, useAppSelector} from '../../store/hooks';
import {useParams} from 'react-router-dom';
import Spinner from '../../components/app/spinner';
import BookmarkButton from '../../components/places-cards/bookmark-button';

import {fetchOfferById} from '../../store/api-actions';
import {CurrentOfferType} from '../../types/current-offer';

function Offer() {
  const {offerId} = useParams();
  const [currentOffer, setCurrentOffer] = useState<CurrentOfferType | null>(null);
  const isAuthorizationUser = useAppSelector(isUserAuthorized);

  useEffect(() => {
    if (offerId) {
      fetchOfferById(offerId).then((responseOffer: CurrentOfferType | null) => setCurrentOffer(responseOffer));
    }
    return () => {
      setCurrentOffer(null);
    };
  }, [offerId]);

  if (!offerId || !currentOffer) {
    return (
      <Spinner/>
    );
  }

  const {
    images,
    goods,
    isPremium,
    rating,
    type,
    isFavorite,
    city,
    bedrooms,
    maxAdults,
    price,
    description,
    title,
    host
  }: OfferType = currentOffer.offer;

  return (
    <Page className="page" title="6 cities: offer">
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
              {isPremium && <div className="offer__mark"><span>Premium</span></div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                {isAuthorizationUser && offerId ?
                  <BookmarkButton size={'large'} favoriteStatus={isFavorite} currentOffer={currentOffer} offerId={offerId} block={'offer'} /> : null}
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: '80%'}}/>
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
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper ${host.isPro && 'offer__avatar-wrapper--pro'}`}
                  >
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
              <Reviews reviews={currentOffer.reviews}/>
              {(isAuthorizationUser && offerId) &&
                <ReviewsForm offerId={offerId} currentOffer={currentOffer} setCurrentOffer={setCurrentOffer} />}
            </div>
          </div>
          {offerId && <CitiesMap offers={currentOffer.nearPlaces} currentCity={city} mapBlock={'offer'}/>}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesCards offers={currentOffer.nearPlaces} block={'near-places'} size={'large'}/>
          </section>

        </div>
      </main>
    </Page>
  );
}

export default Offer;
