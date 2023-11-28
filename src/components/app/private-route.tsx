import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {ReactNode} from 'react';
import {useAppSelector} from '../../store/hooks';
import {selectAuthorizationStatus} from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: ReactNode | ReactNode[];
  redirectTo: string;
};

function PrivateRoute({children, redirectTo}: PrivateRouteProps) {
  return useAppSelector(selectAuthorizationStatus) === AuthorizationStatus.NoAuth
    ? <Navigate to={redirectTo} />
    : children;
}

export default PrivateRoute;
