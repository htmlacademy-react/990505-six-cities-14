import { render, screen } from '@testing-library/react';
import Header from './header';
import {vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import {AppRoute} from '../../../const';

vi.mock('./user-status-bar/user-status-bar', () => ({
  default: () => (
    <div data-testid="status-bar">Bar</div>
  ),
}));

describe('Component: Header', () => {
  it('should render correctly on non login page', () => {
    render(<Header />, {wrapper: BrowserRouter});
    expect(screen.getByTestId('status-bar')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('should render correctly on login page', () => {
    Object.defineProperty(window, 'location', {
      value: new URL(`https://blabla${AppRoute.Login}`)
    });
    render(<Header />, {wrapper: BrowserRouter});
    expect(screen.queryByTestId('status-bar')).toBeNull();
  });
});
