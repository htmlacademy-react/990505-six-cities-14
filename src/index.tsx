import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthAction} from './store/api-actions';

store.dispatch(checkAuthAction());

//TODO решить проблему с перерисовкой кол-ва фаворитов у пользователя

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
