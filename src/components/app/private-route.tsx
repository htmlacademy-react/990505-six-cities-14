import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {ReactNode} from 'react';

type PrivateRouteProps = {
  children: ReactNode | ReactNode[];
  redirectTo: string;
};

function PrivateRoute({children, redirectTo}: PrivateRouteProps) {
  const authorizationStatus = AuthorizationStatus.Auth;
  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
