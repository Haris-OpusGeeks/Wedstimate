import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { errorHandler } from '../Utils/errorHandler';
import paymentServices from "../Services/paymentServices.js";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
}

export const extendFreeTrial = createAsyncThunk(
  'payment/extendFreeTrial',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await paymentServices.extendFreeTrial(requestData);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        return rejectWithValue("Unexpected server response");
      }

    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error"); 
    }
  }
);


export const leadsSlice = createSlice({
    name: 'leadsSlice',
    initialState,

    extraReducers: builder => {
        //  get all time leads list
        builder.addCase(extendFreeTrial.pending, state => {
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = '';
        });
        builder.addCase(extendFreeTrial.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action.payload);
        });
        builder.addCase(extendFreeTrial.rejected, (state, action) => {
            state.isError = true;
            state.errorMessage = action.payload || action.error.message;
        });
    },
    reducers: {},
});