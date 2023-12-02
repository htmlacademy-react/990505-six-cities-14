import {Locations, NameSpace} from '../../const';
import {selectOfferDataLoadingStatus, selectCityName, selectOffers} from './selectors';
import {describe} from 'vitest';
import {makeFakeOffer, makeFakeStore} from '../../utils/mocks';

describe('selectOffers', () => {
  const mockOffers = makeFakeOffer();
  const state = makeFakeStore({
    [NameSpace.Offers]: {
      offers: [mockOffers],
      isOffersDataLoading: false,
      selectedCityName: Locations[0],
    },
  });

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Offers];
    const result = selectOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return selectedCityName data loading status', () => {
    const { selectedCityName } = state[NameSpace.Offers];
    const result = selectCityName(state);
    expect(result).toBe(selectedCityName);
  });

  it('should return isOffersDataLoading data loading status', () => {
    const { isOffersDataLoading } = state[NameSpace.Offers];
    const result = selectOfferDataLoadingStatus(state);
    expect(result).toBe(isOffersDataLoading);
  });
});
