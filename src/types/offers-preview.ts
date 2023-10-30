import {LocationType} from './location';
import {CityType} from './city';

export type OffersPreviewType = {
  city: CityType;
  id: number;
  isFavorite: boolean;
  isPremium: boolean;
  location: LocationType;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}
