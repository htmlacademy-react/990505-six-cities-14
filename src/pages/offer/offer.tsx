import {useEffect} from 'react';
import Page from '../../components/page';
import {OfferType} from '../../types/offers';
import Reviews from '../../components/app/reviews';
import ReviewsForm from './reviews-form';
import {addPluralEnding} from '../../utils';
import CitiesMap from '../../components/app/citiesMap';
import PlacesCards from '../../components/places-cards/places-cards';
import {
  selectAuthorizationStatus,
  selectCurrentOffer,
  selectNearPlaces,
  useAppDispatch,
  useAppSelector
} from '../../store/hooks';
import {useParams } from 'react-router-dom';
import {fetchNearPlaceAction, fetchOfferAction, fetchReviewsAction} from '../../store/api-actions';
import {dropCurrentOffer} from '../../store/action';
import {CityType} from '../../types/city';
import Spinner from '../../components/app/spinner';
import {AuthorizationStatus} from '../../const';

function Offer() {
  const {offerId} = useParams();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isAuthorizationUser = authorizationStatus === AuthorizationStatus.Auth;
  const currentOffer = useAppSelector(selectCurrentOffer);
  const nearPlaces = useAppSelector(selectNearPlaces);
  useEffect(()=> {
    if (offerId) {
      dispatch(fetchOfferAction(offerId));
      dispatch(fetchNearPlaceAction(offerId));
      dispatch(fetchReviewsAction(offerId));
    }
    return () => {
      dispatch(dropCurrentOffer());
    };
  }, [offerId, dispatch]);

  if (!currentOffer) {
    return (
      <Spinner />
    );
  }

  const currentCity: CityType = currentOffer.city;

  const {images, goods, isPremium, rating, type, bedrooms, maxAdults, price, description, title, host}: OfferType = currentOffer;
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
              <Reviews />
              {isAuthorizationUser && offerId ? <ReviewsForm offerId={offerId}/> : null}
            </div>
          </div>
          <CitiesMap offers={nearPlaces} currentCity={currentCity} mapBlock={'offer'}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesCards offers={nearPlaces} block={'near-places'} size={'large'} />
          </section>

        </div>
      </main>
    </Page>
  );
}
export default Offer;
