import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import marketingNotificationServices from '../Services/marketingNotificationServices.js';
import {errorHandler} from '../Utils/errorHandler.js';

const initialState = {
  notifications: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  isSaving: false,
  isDeleting: false,
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

export const createMarketingNotification = createAsyncThunk(
  'createMarketingNotification',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} =
        await marketingNotificationServices.createMarketingNotification(requestData);
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const updateMarketingNotification = createAsyncThunk(
  'updateMarketingNotification',
  async ({id, requestData}, {dispatch}) => {
    try {
      const {status, data} =
        await marketingNotificationServices.updateMarketingNotification(
          id,
          requestData,
        );
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const deleteMarketingNotification = createAsyncThunk(
  'deleteMarketingNotification',
  async (id, {dispatch}) => {
    try {
      const {status, data} =
        await marketingNotificationServices.deleteMarketingNotification(id);
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
    builder.addCase(createMarketingNotification.pending, state => {
      state.isSaving = true;
      state.isError = false;
      state.errorMessage = '';
    });
    builder.addCase(createMarketingNotification.fulfilled, state => {
      state.isSaving = false;
      state.isSuccess = true;
    });
    builder.addCase(createMarketingNotification.rejected, (state, action) => {
      state.isSaving = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
    builder.addCase(updateMarketingNotification.pending, state => {
      state.isSaving = true;
      state.isError = false;
      state.errorMessage = '';
    });
    builder.addCase(updateMarketingNotification.fulfilled, state => {
      state.isSaving = false;
      state.isSuccess = true;
    });
    builder.addCase(updateMarketingNotification.rejected, (state, action) => {
      state.isSaving = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
    builder.addCase(deleteMarketingNotification.pending, state => {
      state.isDeleting = true;
      state.isError = false;
      state.errorMessage = '';
    });
    builder.addCase(deleteMarketingNotification.fulfilled, state => {
      state.isDeleting = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteMarketingNotification.rejected, (state, action) => {
      state.isDeleting = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default marketingNotificationSlice.reducer;
