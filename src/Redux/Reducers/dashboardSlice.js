import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dashboardServices from '../Services/dashbaordServices';
import { errorHandler } from '../Utils/errorHandler';
// import dashboardServices from '../../services/dashboardServices';
// import {errorHandler} from '../../utils/errorHandler';
// import {err} from 'react-native-svg';

const initialState = {
  eventsItem: {
    isLoading: false,
    events: [],
  },
  dashboardDetails: {
    isLoading: false,
    details: null,
    estimatedCost: 0,
  },
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMessage: '',
};


export const getListOfEvents = createAsyncThunk(
    'getListOfEvents',
    async (requestData, {dispatch}) => {
      try {
        const {status, data} = await dashboardServices.getListOfEvents();
        if (status === 200 || status === 201) {
          return data;
        }
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const getEventDetailsById = createAsyncThunk(
    'getEventDetailsById',
    async (id, {dispatch}) => {
      try {
        const {status, data} = await dashboardServices.getEventDetailsById(id);
        if (status === 200 || status === 201) {
          return data;
        }
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const getDashboardDetails = createAsyncThunk(
  'getDashboardDetails',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await dashboardServices.getDashboardDetails();
      if (status === (200 || 201)) {
        return data;
      }
      if (status === 204) {
        return null;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const saveCurrentEvent = createAsyncThunk(
  'saveCurrentEvent',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await dashboardServices.saveCurrentEvent();
      if (status === (200 || 201)) {
        dispatch(getDashboardDetails());
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const deleteEventPreference = createAsyncThunk(
  'deleteEventPreference',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await dashboardServices.deleteEventPreference(
        requestData,
      );
      if (status === (200 || 201)) {
        dispatch(getDashboardDetails());
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const dashbaordSlice = createSlice({
  name: 'dashbaordSlice',
  initialState,

  extraReducers: builder => {
    //  get events list
    builder.addCase(getListOfEvents.pending, state => {
      state.eventsItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getListOfEvents.fulfilled, (state, action) => {
      state.eventsItem.isLoading = false;
      state.isSuccess = true;
      state.eventsItem.events = action.payload;
    });
    builder.addCase(getListOfEvents.rejected, (state, action) => {
      state.eventsItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
    //  get events details
    builder.addCase(getEventDetailsById.pending, state => {
      state.dashboardDetails.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getEventDetailsById.fulfilled, (state, action) => {
      const {
        id,
        zipCode,
        date,
        noOfGuest,
        name,
        isOpen,
        pieChart,
        deals,
        vendorPreferences,
        packageDetails,
      } = action.payload || {};
      state.dashboardDetails.isLoading = false;
      state.isSuccess = true;
      state.dashboardDetails.details = {
        id,
        zipCode,
        date,
        noOfGuest,
        name,
        isOpen,
        pieChart,
        data: [...deals, ...vendorPreferences, ...packageDetails],
      };
      state.dashboardDetails.estimatedCost = [
        ...deals,
        ...vendorPreferences,
        ...packageDetails,
      ].reduce(
          (accumulator, currentValue) => accumulator + currentValue?.price,
          0,
      );
    });
    builder.addCase(getEventDetailsById.rejected, (state, action) => {
      state.dashboardDetails.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
    //  get dashboard details
    builder.addCase(getDashboardDetails.pending, state => {
      state.dashboardDetails.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getDashboardDetails.fulfilled, (state, action) => {
      if (action.payload != null) {
        const {
          id,
          zipCode,
          date,
          noOfGuest,
          name,
          isOpen,
          pieChart,
          deals,
          vendorPreferences,
          packageDetails,
        } = action?.payload || {};
        state.dashboardDetails.details = {
          id,
          zipCode,
          date,
          noOfGuest,
          name,
          isOpen,
          pieChart,
          data: [...deals, ...vendorPreferences, ...packageDetails],
        };
        state.dashboardDetails.estimatedCost = [
          ...deals,
          ...vendorPreferences,
          ...packageDetails,
        ].reduce(
          (accumulator, currentValue) => accumulator + currentValue?.price,
          0,
        );
      } else {
        state.dashboardDetails.estimatedCost = 0;
        state.dashboardDetails.details = null;
      }
      state.isSuccess = true;
      state.dashboardDetails.isLoading = false;
    });
    builder.addCase(getDashboardDetails.rejected, (state, action) => {
      state.dashboardDetails.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // save current event
    builder.addCase(saveCurrentEvent.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(saveCurrentEvent.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(saveCurrentEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // delete event preference
    builder.addCase(deleteEventPreference.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(deleteEventPreference.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteEventPreference.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {},
});

export default dashbaordSlice.reducer;