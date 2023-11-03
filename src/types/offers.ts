import {HostType} from './host';
import {OfferPreviewType} from './offers-preview';

export type OfferType = OfferPreviewType & {
  bedrooms: number;
  description: string;
  goods: string[];
  host: HostType;
  images: string[];
  maxAdults: number;
}
