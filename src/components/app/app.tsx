import Main from '../../pages/main/main';
import {JSX} from 'react';

type AppProps = {
  offerCount: number;
}

function App({offerCount}: AppProps): JSX.Element {
  return (
    <Main offerCount={offerCount} />
  );
}

export default App;
