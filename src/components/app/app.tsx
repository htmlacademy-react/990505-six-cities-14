import {Favorites, Login, Main, NotFoundPage, Offer} from '../../pages';
import {AppRoute} from '../../const';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import PrivateRoute from './private-route';

function App() {
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
              <PrivateRoute redirectTo={AppRoute.Login}>
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
