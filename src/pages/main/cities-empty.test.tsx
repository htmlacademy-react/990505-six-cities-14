import CitiesEmpty from './cities-empty';
import {Locations} from '../../const';
import { render, screen } from '@testing-library/react';
import {makeFakeStore} from '../../utils/mocks';
import {withStore} from '../../utils/mock-component';

describe('Component: CitiesEmpty', () => {
  it('should render correctly', () => {

    const expectedText = 'No places to stay available';

    const { withStoreComponent } = withStore(
      <CitiesEmpty currentCityName={Locations[0]} />,
      makeFakeStore()
    );

    render(withStoreComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
