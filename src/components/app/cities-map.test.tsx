import { render, screen } from '@testing-library/react';
import {makeFakeCity, makeFakeOffer} from '../../utils/mocks';
import CitiesMap from './cities-map';

describe('Component: CitiesMap', () => {
  it('should render correctly', () => {
    render(<CitiesMap offers={[makeFakeOffer()]} selectedOffer={makeFakeOffer()} currentCity={makeFakeCity()} mapBlock='cities' />);
    expect(screen.getByText('Leaflet')).toBeInTheDocument();
  });
});
