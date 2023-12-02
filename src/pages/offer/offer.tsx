import {useEffect, useState} from 'react';
import Page from '../../components/page';
import {OfferType} from '../../types/offers';
import Reviews from './reviews';
import {addPluralEnding, offerRatingInPercentage} from '../../utils';
import CitiesMap from '../../components/app/cities-map';
import PlacesCards from '../../components/places-cards/places-cards';
import {useParams} from 'react-router-dom';
import Spinner from '../../components/app/spinner';
import BookmarkButton from '../../components/places-cards/bookmark-button';

import {fetchOfferById, fetchOffersAction} from '../../store/api-actions';
import {CurrentOfferType} from '../../types/current-offer';
import {MAX_IMAGES_LENGTH} from '../../const';
import {AxiosError} from 'axios';
import {NotFoundPage} from '../index';
import {useAppDispatch} from '../../store/hooks';
import {setOffers} from '../../store/offers-data/offers-data';

function Offer() {
  const {offerId} = useParams();
  const [currentOffer, setCurrentOffer] = useState<CurrentOfferType | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOffersAction());
    return () => {
      dispatch(setOffers([]));
    };
  }, [dispatch]);

  useEffect(() => {
    if (offerId) {
      fetchOfferById(offerId).then((responseOffer: CurrentOfferType | null) => {
        if (responseOffer) {
          setCurrentOffer(responseOffer);
        }
      }).catch((response: AxiosError<{message:string}>) => {
        if (response.response?.status === 404) {
          setIsNotFound(true);
        }
      });
    }
    return () => {
      setCurrentOffer(null);
    };
  }, [offerId]);

  if (isNotFound) {
    return (
      <NotFoundPage />
    );
  }
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
              {images.slice(0, MAX_IMAGES_LENGTH).map((img) => (
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
                <BookmarkButton size='large' favoriteStatus={isFavorite} offerId={offerId} block='offer' />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${offerRatingInPercentage(rating)}%`}} />
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
                  Max {maxAdults} adult{addPluralEnding(maxAdults)}
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
                  {host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <Reviews reviews={currentOffer.reviews} offerId={offerId} currentOffer={currentOffer} setCurrentOffer={setCurrentOffer}/>
            </div>
          </div>
          {offerId && <CitiesMap offers={[...currentOffer.nearPlaces, currentOffer.offer]} selectedOffer={currentOffer.offer} currentCity={city} mapBlock='offer'/>}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesCards offers={currentOffer.nearPlaces} block='near-places' size='large'/>
          </section>
        </div>
      </main>
    </Page>
  );
}

export default Offer;
