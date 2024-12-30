import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import preferenceServices from '../Services/preferenceServices';
import { errorHandler } from '../Utils/errorHandler';
import { saveSessionData } from '../Utils/localStore';
import { messageHandlerSet } from './messageHandlerSlice';
import { TOAST_STATUS } from '../Constants/enum';

const initialState = {
  preferenceItem: {
    isLoading: false,
    preference: null,
  },

  uniqueVisitorsCount: 0,
  isSuccess: false,
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const getMyPreference = createAsyncThunk(
  'getMyPreference',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await preferenceServices.getMyPreference();
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const getUniqueVisitorsCount = createAsyncThunk(
  'getUniqueVisitorsCount',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await preferenceServices.getUniqueVisitorsCount();
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const addMyPreference = createAsyncThunk(
  'addMyPreference',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await preferenceServices.addMyPreference(
        requestData,
      );
      if (status === 200 || status === 201) {
        saveSessionData();
        // navigate(NavigationStrings.MEMBERSHIP);
        // await sleep(2000);
        dispatch(
          messageHandlerSet({
            status: TOAST_STATUS.SUCCESS,
            message: data,
          }),
        );
        return data;
      }
    } catch (error) {
      console.log(error.message);
      throw errorHandler(error, dispatch);
    }
  },
);

export const updateMyPreference = createAsyncThunk(
  'updateMyPreference',
  async (formData, {dispatch}) => {
    try {
      const {status, data} = await preferenceServices.updateMyPreference(
        formData,
      );
      if (status === 200 || status === 201) {
        dispatch(
          messageHandlerSet({
            status: TOAST_STATUS.SUCCESS,
            message: data,
          }),
        );
        return data;
      }
    } catch (error) {
      console.log(error?.response?.data.errors);
      throw errorHandler(error, dispatch);
    }
  },
);

export const preferenceSlice = createSlice({
  name: 'preferenceSlice',
  initialState,

  extraReducers: builder => {
    //  get my preference
    builder.addCase(getMyPreference.pending, state => {
      state.preferenceItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getMyPreference.fulfilled, (state, action) => {
      state.preferenceItem.isLoading = false;
      state.isSuccess = true;
      state.preferenceItem.preference = action.payload;
      // localStorage.setItem('preference', state.preferenceItem.preference);
    });
    builder.addCase(getMyPreference.rejected, (state, action) => {
      state.preferenceItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    //  get unique visitor count
    builder.addCase(getUniqueVisitorsCount.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getUniqueVisitorsCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.uniqueVisitorsCount = action.payload;
    });
    builder.addCase(getUniqueVisitorsCount.rejected, (state, action) => {
      state.preferenceItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // add preference
    builder.addCase(addMyPreference.pending, state => {
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    });
    builder.addCase(addMyPreference.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(addMyPreference.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.isError = true;
      state.isLoading = false;
    });

    // update preference
    builder.addCase(updateMyPreference.pending, state => {
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    });
    builder.addCase(updateMyPreference.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(updateMyPreference.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {},
});

export default preferenceSlice.reducer;