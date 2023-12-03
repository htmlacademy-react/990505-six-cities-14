import {render, screen} from '@testing-library/react';
import {AppRoute, AuthorizationStatus, Locations, NameSpace} from '../../const';
import App from './app';
import {withStore} from '../../utils/mock-component';
import {makeFakeOffer, makeFakeStore, makeFakeUserInfo} from '../../utils/mocks';

describe('Application Routing', () => {
  it('should render "Offers" when user navigate to "/"', () => {
    Object.defineProperty(window, 'location', {
      value: new URL('https://blabla/')
    });
    const {withStoreComponent} = withStore(<App/>, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render "Offer" when user navigate to "/offer/:id"', () => {
    Object.defineProperty(window, 'location', {
      value: new URL(`https://blabla${AppRoute.Offer}/1`)
    });
    const {withStoreComponent} = withStore(<App/>, makeFakeStore());

    render(withStoreComponent);

    const result = document.getElementsByClassName('spinner').length;
    expect(result).toBe(1);
  });

  it('should render "Favorites" when user navigate to "/favorites"', () => {
    Object.defineProperty(window, 'location', {
      value: new URL(`https://blabla${AppRoute.Favorites}`)
    });
    const offer = makeFakeOffer();
    offer.isFavorite = true;
    const {withStoreComponent} = withStore(<App/>, makeFakeStore({
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth, currentUserInfo: makeFakeUserInfo()},
      [NameSpace.Offers]: {offers: [offer], selectedCityName: Locations[0], isOffersDataLoading: false}
    }));

    render(withStoreComponent);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    Object.defineProperty(window, 'location', {
      value: new URL(`https://blabla${AppRoute.Login}`)
    });
    const {withStoreComponent} = withStore(<App/>, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    Object.defineProperty(window, 'location', {
      value: new URL('https://blabla/unknown')
    });
    const {withStoreComponent} = withStore(<App/>, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
