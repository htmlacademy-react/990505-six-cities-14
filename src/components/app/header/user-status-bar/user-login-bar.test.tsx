import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import UserLoginBar from './user-login-bar';

describe('Component: UserLoginBar', () => {
  it('should render correctly', () => {
    render(<UserLoginBar />, {wrapper: BrowserRouter});
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
