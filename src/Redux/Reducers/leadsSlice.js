import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import leadsServices from '../Services/leadServices';
import { errorHandler } from '../Utils/errorHandler';

const initialState = {
  newLeadsItem: {
    isLoading: false,
    leads: [],
  },
  allTimeLeadsItem: {
    isLoading: false,
    leads: [],
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const getListOfNewLeads = createAsyncThunk(
  'getListOfNewLeads',
  async (requestData, {dispatch}) => {
    console.log('trying');
    try {
      const {status, data} = await leadsServices.getListOfNewLeads(requestData);
      if (status === 200 || status === 201) {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
      throw errorHandler(error, dispatch);
    }
  },
);

export const getListOfAllTimeLeads = createAsyncThunk(
  'getListOAllTimeLeads',
  async (requestData, {dispatch}) => {
    console.log('trying');
    try {
      const {status, data} = await leadsServices.getListOfAllTimeLeads(requestData);
      if (status === 200 || status === 201) {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
      throw errorHandler(error, dispatch);
    }
  },
);

export const leadsSlice = createSlice({
  name: 'leadsSlice',
  initialState,

  extraReducers: builder => {
    //  get new leads list
    builder.addCase(getListOfNewLeads.pending, state => {
      state.newLeadsItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getListOfNewLeads.fulfilled, (state, action) => {
      state.newLeadsItem.isLoading = false;
      state.isSuccess = true;
      state.newLeadsItem.leads = action.payload;
    });
    builder.addCase(getListOfNewLeads.rejected, (state, action) => {
      state.newLeadsItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    //  get all time leads list
    builder.addCase(getListOfAllTimeLeads.pending, state => {
      state.allTimeLeadsItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getListOfAllTimeLeads.fulfilled, (state, action) => {
      state.allTimeLeadsItem.isLoading = false;
      state.isSuccess = true;
      state.allTimeLeadsItem.leads = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getListOfAllTimeLeads.rejected, (state, action) => {
      state.allTimeLeadsItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {},
});

export default leadsSlice.reducer;