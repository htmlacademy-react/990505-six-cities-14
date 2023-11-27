import {logoutAction} from '../../../../store/api-actions';
import {Link} from 'react-router-dom';
import {selectCurrentUserInfo, selectOffers, useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {MouseEvent} from 'react';

function UserLogoutBar() {
  const dispatch = useAppDispatch();
  const currentUserInfo = useAppSelector(selectCurrentUserInfo);
  const favoriteOffersCount = useAppSelector(selectOffers).filter((offer) => offer.isFavorite).length;
  const handleClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };
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
            <span className="header__favorite-count">{favoriteOffersCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to="src/components/app/header/user-status-bar/user-status-bar#" onClick={handleClick}>
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserLogoutBar;

