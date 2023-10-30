import {Navigate} from 'react-router-dom';
import {JSX} from 'react';
import {AppRouter, AuthorizationStatus} from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute({authorizationStatus = 'AUTH', children}: PrivateRouteProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRouter.Login} />;
}

export default PrivateRoute;
