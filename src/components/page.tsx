import {ReactNode} from 'react';
import {Helmet} from 'react-helmet-async';
import Header from './app/header/header';

type PageProps = {
  title: string;
  children: ReactNode | ReactNode[];
  className: string;
}

function Page({title, children, className}: PageProps) {
  return (
    <div className={className}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      {children}
    </div>
  );
}

export default Page;
