import {Navigate} from 'react-router-dom';
import {JSX} from 'react';
import {AuthorizationStatus} from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  redirectTo: string;
};

function PrivateRoute({authorizationStatus = AuthorizationStatus.Auth, children, redirectTo}: PrivateRouteProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
