import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/app/app';
import {offers} from './mocks/offers';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App offers={offers}/>
  </StrictMode>
);
