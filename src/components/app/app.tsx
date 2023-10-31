import {Main, Favorites, Login, Offer, NotFoundPage} from '../../pages';
import {AppRouter, AuthorizationStatus} from '../../const';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import PrivateRoute from './private-route';
import {OfferType} from '../../types/offers';

type AppProps = {
  offers: OfferType[];
}

function App({offers}: AppProps) {
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
                authorizationStatus={AuthorizationStatus.NoAuth}
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
                authorizationStatus={AuthorizationStatus.Auth}
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
