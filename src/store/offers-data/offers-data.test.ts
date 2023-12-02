import {Locations} from '../../const';
import {offersData} from './offers-data';
import {fetchOffersAction} from '../api-actions';
import {makeFakeOffer} from '../../utils/mocks';

describe('OfferData Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      isOffersDataLoading: false,
      selectedCityName: Locations[0],
    };

    const result = offersData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      isOffersDataLoading: true,
      selectedCityName: Locations[0],
    };

    const result = offersData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to "true", with "fetchOffersAction.pending"', () => {
    const expectedState = {
      offers: [],
      isOffersDataLoading: true,
      selectedCityName: Locations[0],
    };

    const result = offersData.reducer(undefined, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to array with offer, "isOffersDataLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
    const mockOffers = makeFakeOffer();
    const expectedState = {
      offers: [mockOffers],
      isOffersDataLoading: false,
      selectedCityName: Locations[0],
    };

    const result = offersData.reducer(
      undefined,
      fetchOffersAction.fulfilled(
        [mockOffers], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to "true",  with "fetchOffersAction.rejected', () => {
    const expectedState = {
      offers: [],
      isOffersDataLoading: false,
      selectedCityName: Locations[0],
    };

    const result = offersData.reducer(
      undefined,
      fetchOffersAction.rejected
    );

    expect(result).toEqual(expectedState);
  });
});

