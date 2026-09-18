import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import marketingNotificationServices from '../Services/marketingNotificationServices.js';
import {errorHandler} from '../Utils/errorHandler.js';

const initialState = {
  notifications: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const getListOfMarketingNotifications = createAsyncThunk(
  'getListOfMarketingNotifications',
  async (params, {dispatch}) => {
    try {
      const {status, data} =
        await marketingNotificationServices.getListOfMarketingNotifications(
          params,
        );
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const marketingNotificationSlice = createSlice({
  name: 'marketingNotificationSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(getListOfMarketingNotifications.pending, state => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    });
    builder.addCase(getListOfMarketingNotifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.notifications = action.payload;
    });
    builder.addCase(getListOfMarketingNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default marketingNotificationSlice.reducer;
