import {Favorites, Login, Main, NotFoundPage, Offer} from '../../pages';
import {AppRoute} from '../../const';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import PrivateRoute from './private-route';
import GuestRoute from './guest-router';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            element={
              <GuestRoute redirectTo={AppRoute.Main}>
                <Login/>
              </GuestRoute>
            }
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </HelmetProvider>
  );
}

export default App;
