import {
  selectAuthorizationStatus, selectCurrentUserInfo,
  selectFavoriteOffers, useAppDispatch,
  useAppSelector
} from '../../../store/hooks';
import {AppRoute, AuthorizationStatus} from '../../../const';
import {Link} from 'react-router-dom';
import {logoutAction} from '../../../store/api-actions';

function UserStatusBar() {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isAuthorizationUser = authorizationStatus === AuthorizationStatus.Auth;
  const currentUserInfo = useAppSelector(selectCurrentUserInfo);
  const favoriteOffers = useAppSelector(selectFavoriteOffers);

  const dispatch = useAppDispatch();
  if (!isAuthorizationUser) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login" >Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to="src/components/app/header/user-status-bar#"
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">{currentUserInfo?.email}</span>
            <span className="header__favorite-count">{favoriteOffers.length}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="src/components/app/header/user-status-bar#"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
          >
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default UserStatusBar;

