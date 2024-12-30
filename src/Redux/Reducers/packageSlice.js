import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { errorHandler } from '../Utils/errorHandler';
import packageServices from '../Services/packageServices';
import blogServices from "../Services/blogServices.js";
import {messageHandlerSet} from "./messageHandlerSlice.js";
import {TOAST_STATUS} from "../Constants/enum.js";


const initialState = {
  packageItem: {
    isLoading: false,
    packages: [],
  },
  membershipItem: {
    isLoading: false,
    membership: [],
  },
  isSuccess: false,
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const getListOfPackages = createAsyncThunk(
  'getListOfPackages',
  async (params, {dispatch}) => {
    try {
      const {status, data} = await packageServices.getListOfPackages(params);
      if (status === 200 || status === 201) {
        console.log(data);
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);
export const getListOfMembershipTypes = createAsyncThunk(
  'getMembershipTypes',
  async (params, {dispatch}) => {
    try {
      const {status, data} = await packageServices.getMembershipTypes(params);
      if (status === 200 || status === 201) {
        console.log(data);
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const addPackageInEvent = createAsyncThunk(
  'addPackageInEvent',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await packageServices.addPackageInEvent(requestData);
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const createPackage = createAsyncThunk(
  'createPackage',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await packageServices.createPackage(requestData);
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const updatePackage = createAsyncThunk(
    'updatePackage',
    async (requestData, {dispatch}) => {
      try {
        const {status, data} = await packageServices.updatePackage(requestData);
        if (status === (200 || 201)) {
          dispatch(
              messageHandlerSet({
                message: 'Package Updated Successfully',
                status: TOAST_STATUS.SUCCESS,
              }),
          );
          return data;
        }
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const deletePackage = createAsyncThunk(
    'deletePackage',
    async (requestData, {dispatch}) => {
      try {
        const {status, data} = await packageServices.deletePackage(
            requestData,
        );
        if (status === (200 || 201)) {
          return data;
        }
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const packageSlice = createSlice({
  name: 'packageSlice',
  initialState,

  extraReducers: builder => {
    //  get vendor package list
    builder.addCase(getListOfPackages.pending, state => {
      state.packageItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getListOfPackages.fulfilled, (state, action) => {
      state.packageItem.isLoading = false;
      state.isSuccess = true;
      state.packageItem.packages = action.payload;
    });
    builder.addCase(getListOfPackages.rejected, (state, action) => {
      state.packageItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    //  get Membership Type list
    builder.addCase(getListOfMembershipTypes.pending, state => {
      state.membershipItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getListOfMembershipTypes.fulfilled, (state, action) => {
      state.membershipItem.isLoading = false;
      state.isSuccess = true;
      state.membershipItem.membership = action.payload;
    });
    builder.addCase(getListOfMembershipTypes.rejected, (state, action) => {
      state.membershipItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // add package in event
    builder.addCase(addPackageInEvent.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(addPackageInEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(addPackageInEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // create Package
    builder.addCase(createPackage.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(createPackage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(createPackage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    //  update Package
    builder.addCase(updatePackage.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updatePackage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(updatePackage.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    // delete Package
    builder.addCase(deletePackage.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(deletePackage.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(deletePackage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {},
});

export default packageSlice.reducer;