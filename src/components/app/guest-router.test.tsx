import {render, screen} from '@testing-library/react';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeStore, makeFakeUserInfo} from '../../utils/mocks';
import {withStore} from '../../utils/mock-component';
import GuestRoute from './guest-router';
import {vi} from 'vitest';
import {NavigateProps} from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  Navigate: (args: NavigateProps) => (
    <div data-testid="navigate" {...args}></div>
  ),
}));

describe('Component: GuestRoute', () => {
  it('should render correctly on logged', () => {
    const {withStoreComponent} = withStore(<GuestRoute redirectTo="/some-url"><div>content</div></GuestRoute>, makeFakeStore({
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth, currentUserInfo: makeFakeUserInfo()},
    }));

    render(withStoreComponent);
    expect(screen.getByTestId('navigate')).toHaveAttribute('to', '/some-url');
    expect(screen.getByTestId('navigate')).toBeInTheDocument();
  });

  it('should render correctly on guest', () => {
    const {withStoreComponent} = withStore(<GuestRoute redirectTo="/some-url"><div>content</div></GuestRoute>, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });
});
