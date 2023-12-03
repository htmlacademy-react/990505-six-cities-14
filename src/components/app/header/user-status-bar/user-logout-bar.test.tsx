import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import UserLogoutBar from './user-logout-bar';
import {makeFakeOffer, makeFakeStore, makeFakeUserInfo} from '../../../../utils/mocks';
import {withStore} from '../../../../utils/mock-component';
import {AuthorizationStatus, Locations, NameSpace} from '../../../../const';

describe('Component: UserLogoutBar', () => {
  it('should render correctly', () => {
    const user = makeFakeUserInfo();
    const offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
    offers[0].isFavorite = true;
    offers[1].isFavorite = false;
    offers[2].isFavorite = true;

    const { withStoreComponent } = withStore(<UserLogoutBar />, makeFakeStore({
      [NameSpace.User]: {
        currentUserInfo: user,
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Offers]: {
        offers: offers,
        selectedCityName: Locations[0],
        isOffersDataLoading: false,
      },
    }));

    render(withStoreComponent, {wrapper: BrowserRouter});

    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
  });
});
