import { render, } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {

    render(<Spinner />);

    const result = document.getElementsByClassName('spinner').length;
    expect(result).toBe(1);
  });
});
