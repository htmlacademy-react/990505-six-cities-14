import {JSX} from 'react';

type ContainerProps = {
  children: JSX.Element;
}

function Container({children}: ContainerProps): JSX.Element {
  return (
    <div className="container">
      {children}
    </div>
  );
}

export default Container;

