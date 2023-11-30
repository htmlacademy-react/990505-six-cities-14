import {useAppSelector,} from '../../../../store/hooks';
import UserLogoutBar from './user-logout-bar';
import UserLoginBar from './user-login-bar';
import {isUserAuthorized} from '../../../../store/user-process/selectors';

function UserStatusBar() {
  const isAuthorizationUser = useAppSelector(isUserAuthorized);

  return (
    !isAuthorizationUser ? <UserLoginBar/> : <UserLogoutBar/>);
}

export default UserStatusBar;

