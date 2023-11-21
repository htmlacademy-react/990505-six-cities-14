import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {ReactNode} from 'react';
import {selectAuthorizationStatus, useAppSelector} from '../../store/hooks';

type PrivateRouteProps = {
  children: ReactNode | ReactNode[];
  redirectTo: string;
};

function PrivateRoute({children, redirectTo}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  return authorizationStatus === AuthorizationStatus.NoAuth
    ? <Navigate to={redirectTo} />
    : children;
}

export default PrivateRoute;
