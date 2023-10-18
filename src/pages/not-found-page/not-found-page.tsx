import {JSX} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/app/header/header';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: page not found</title>
      </Helmet>
      <Header isAuthorizedUser={false} />
      <main className="page__main" style={{minHeight: '100vh'}}>
        <div className="container">
          <h1>404</h1>
          <p>Page not found &#9785;. <br/> Places to stay were also not found.</p>
          <Link to='/' className='form__submit button'>Go back to the homepage</Link>
        </div>
      </main>
    </div>
  );
}
export default NotFoundPage;

