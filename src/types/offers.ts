import {HostType} from './host';
import {OffersPreviewType} from './offers-preview';

export type OfferType = OffersPreviewType & {
  bedrooms: number;
  description: string;
  goods: string[];
  host: HostType;
  images: string[];
  maxAdults: number;
}
