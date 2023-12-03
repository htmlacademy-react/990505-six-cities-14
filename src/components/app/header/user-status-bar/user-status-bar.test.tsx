import { render, screen } from '@testing-library/react';
import {vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import UserStatusBar from './user-status-bar';
import * as hooks from '../../../../store/hooks';

vi.mock('./user-login-bar', () => ({
  default: () => (
    <div data-testid="login-bar">Login</div>
  ),
}));

vi.mock('./user-logout-bar', () => ({
  default: () => (
    <div data-testid="logout-bar">Logout</div>
  ),
}));

describe('Component: UserStatusBar', () => {
  it('should render correctly on guest', () => {
    vi.spyOn(hooks, 'useAppSelector').mockReturnValue(false);

    render(<UserStatusBar />, {wrapper: BrowserRouter});
    expect(screen.getByTestId('login-bar')).toBeInTheDocument();
  });

  it('should render correctly on logged', () => {
    vi.spyOn(hooks, 'useAppSelector').mockReturnValue(true);

    render(<UserStatusBar />, {wrapper: BrowserRouter});
    expect(screen.queryByTestId('logout-bar')).toBeInTheDocument();
  });
});
