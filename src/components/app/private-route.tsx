import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {ReactNode} from 'react';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: ReactNode | ReactNode[];
  redirectTo: string;
};

function PrivateRoute({authorizationStatus = AuthorizationStatus.Auth, children, redirectTo}: PrivateRouteProps) {
  return children;
  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
