import {StateType} from '../../types/state';
import {NameSpace} from '../../const';

export const selectOfferDataLoadingStatus = (state: StateType) => state[NameSpace.Offers].isOffersDataLoading;
export const selectCityName = (state: StateType) => state[NameSpace.Offers].selectedCityName;
export const selectOffers = (state: StateType) => state[NameSpace.Offers].offers;

