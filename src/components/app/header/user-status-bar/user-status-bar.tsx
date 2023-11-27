import {isUserAuthorized, useAppSelector,} from '../../../../store/hooks';

import UserLogoutBar from './user-logout-bar';
import UserLoginBar from './user-login-bar';

function UserStatusBar() {
  const isAuthorizationUser = useAppSelector(isUserAuthorized);

  return (
    !isAuthorizationUser ? <UserLoginBar/> : <UserLogoutBar/>);
}

export default UserStatusBar;

