import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { errorHandler } from '../Utils/errorHandler';
import dealServices from '../Services/dealServices';

const initialState = {
  dealsItem: {
    isLoading: false,
    isRefreshing: false,
    moreLoading: false,
    deals: [],
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const getListOfDeals = createAsyncThunk(
  'getListOfDeals',
  async (requestData,{dispatch}) => {
    try {
      const {status, data} = await dealServices.getListOfDeals();
      if (status === 200 || status === 201) {
        console.log(data)
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const addDealInEvent = createAsyncThunk(
  'addDealInEvent',
  async ({requestData, onDone}, {dispatch}) => {
    try {
      const {status, data} = await dealServices.addDealInEvent(requestData);
      if (status === 200 || status === 201) {
        onDone();
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const createDeal = createAsyncThunk(
  'createDeal',
  async ({formData, onDone}, {dispatch}) => {
    try {
      const {status, data} = await dealServices.createDeal(formData);
      if (status === 200 || status === 201) {
        onDone();
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);
export const dealSlice = createSlice({
  name: 'dealSlice',
  initialState,

  extraReducers: builder => {
    //  get vendor deal list
    builder.addCase(getListOfDeals.pending, (state, action) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getListOfDeals.fulfilled, (state, action) => {
      state.dealsItem.isLoading = false;
      state.dealsItem.moreLoading = false;
      state.isSuccess = true;
      state.dealsItem.deals = action.payload;
    });
    builder.addCase(getListOfDeals.rejected, (state, action) => {
      state.dealsItem.isLoading = false;
      state.dealsItem.moreLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // add deal in event
    builder.addCase(addDealInEvent.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(addDealInEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(addDealInEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // create deal
    builder.addCase(createDeal.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(createDeal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(createDeal.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {},
});

export default dealSlice.reducer;