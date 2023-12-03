import {render, screen} from '@testing-library/react';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeStore, makeFakeUserInfo} from '../../utils/mocks';
import {withStore} from '../../utils/mock-component';
import {vi} from 'vitest';
import PrivateRoute from './private-route';
import {NavigateProps} from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  Navigate: (args: NavigateProps) => (
    <div data-testid="navigate" {...args}></div>
  ),
}));

describe('Component: PrivateRoute', () => {
  it('should render correctly on logged', () => {
    const {withStoreComponent} = withStore(<PrivateRoute redirectTo="/some-url">
      <div>content</div>
    </PrivateRoute>, makeFakeStore({
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth, currentUserInfo: makeFakeUserInfo()},
    }));

    render(withStoreComponent);

    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it('should render correctly on guest', () => {
    const {withStoreComponent} = withStore(<PrivateRoute redirectTo="/some-url">
      <div>content</div>
    </PrivateRoute>, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId('navigate').getAttribute('to')).eq('/some-url');
    expect(screen.getByTestId('navigate')).toBeInTheDocument();
  });
});
