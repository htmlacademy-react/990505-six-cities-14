import UserStatusBar from './user-status-bar';
import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../../const';
import Container from '../container';

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === AppRoute.Login.toString();
  return (
    <header className="header">
      <Container >
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main} >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          {!isLoginPage && <UserStatusBar />}
        </div>
      </Container>
    </header>
  );
}

export default Header;

