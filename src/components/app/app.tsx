import {Main, Favorites, Login, Offer, NotFoundPage} from '../../pages';
import {AppRoute} from '../../const';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import PrivateRoute from './private-route';
import {selectOfferDataLoadingStatus, useAppSelector} from '../../store/hooks';
import Spinner from './spinner';

function App() {
  const isOfferDataLoading = useAppSelector(selectOfferDataLoadingStatus);
  if (isOfferDataLoading) {
    return <Spinner />;
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main />}
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element={<Offer />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                redirectTo={AppRoute.Login}
              >
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
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
