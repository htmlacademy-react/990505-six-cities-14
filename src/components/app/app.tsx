import {Main, Favorites, Login, Offer, NotFoundPage} from '../../pages';
import {JSX} from 'react';
import {AppRouter} from '../../const';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import PrivateRoute from './private-route';
import {OfferType} from '../../types/offers';
import {AuthorizationStatus} from '../../const';

type AppProps = {
  offers: OfferType[];
}

function App({offers}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRouter.Main}
            element={<Main offers={offers}/>}
          />
          <Route
            path={`${AppRouter.Offer}/:offerId`}
            element={<Offer offers={offers}/>}
          />
          <Route
            path={AppRouter.Favorites}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRouter.Login}
              >
                <Favorites offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRouter.Login}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRouter.Main}
              >
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
