import {ReactNode} from 'react';

type ContainerProps = {
  children: ReactNode | ReactNode[];
}

function Container({children}: ContainerProps) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

export default Container;

