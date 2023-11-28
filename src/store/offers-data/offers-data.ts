import {fetchFavoriteOffersAction, fetchOffersAction} from '../api-actions';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_CITY, NameSpace} from '../../const';
import {OffersData} from '../../types/initial-state';
import {OfferPreviewType} from '../../types/offers-preview';

const initialState: OffersData = {
  offers: [],
  isOffersDataLoading: true,
  selectedCityName: DEFAULT_CITY,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<OfferPreviewType[]>) {
      state.offers = action.payload;
    },
    setFavoriteStatus(state, action: PayloadAction<{offerId: string; status: boolean}>) {
      state.offers.map((item) => {
        if (item.id === action.payload.offerId) {
          item.isFavorite = action.payload.status;
        }
      });
    },
    setSelectedCityName(state, action: PayloadAction<string>) {
      state.selectedCityName = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offers = [];
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers = [];
        state.isOffersDataLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.offers = [];
        state.isOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.offers = [];
        state.isOffersDataLoading = false;
      });
  }
});

export const {setOffers, setFavoriteStatus, setSelectedCityName} = offersData.actions;
