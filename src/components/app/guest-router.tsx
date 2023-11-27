import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {ReactNode} from 'react';
import {selectAuthorizationStatus, useAppSelector} from '../../store/hooks';

type GuestRouteProps = {
  children: ReactNode | ReactNode[];
  redirectTo: string;
};

function GuestRoute({children, redirectTo}: GuestRouteProps) {
  return useAppSelector(selectAuthorizationStatus) === AuthorizationStatus.Auth
    ? <Navigate to={redirectTo} />
    : children;
}

export default GuestRoute;
