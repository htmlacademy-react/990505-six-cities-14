import {Main, Favorites, Login, Offer, NotFoundPage} from '../../pages';
import {AppRouter} from '../../const';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import PrivateRoute from './private-route';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRouter.Main}
            element={<Main />}
          />
          <Route
            path={`${AppRouter.Offer}/:offerId`}
            element={<Offer />}
          />
          <Route
            path={AppRouter.Favorites}
            element={
              <PrivateRoute
                redirectTo={AppRouter.Login}
              >
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRouter.Login}
            element={
              <PrivateRoute
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
