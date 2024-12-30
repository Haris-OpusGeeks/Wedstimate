// import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import { TOAST_STATUS } from '../Constants/enum';
import profileServices from '../Services/profileServices';
import { errorHandler } from '../Utils/errorHandler';
import { messageHandlerSet } from './messageHandlerSlice';


const initialState = {
  user: null,
  isLoading: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  couples:{
    coupleList:[],
    isLoading:false
  }
};

export const getUserProfile = createAsyncThunk(
  'getUserProfile',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await profileServices.getUserProfile();
      if (status === (200 || 201)) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'updateUserProfile',
  async ({formData, onDone}, {dispatch}) => {
    try {
      const {status, data} = await profileServices.updateUserProfile(formData);
      if (status === (200 || 201)) {
        onDone(data);
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const deleteVendorUser = createAsyncThunk(
  'deleteVendorUser',
  async (requestData, {dispatch}) => {
    try {
      console.log(requestData)
      const {status, data} = await profileServices.deleteVendorUser(requestData);
      if (status === (200 || 201)) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const deleteCoupleUser = createAsyncThunk(
  'deleteCoupleUser',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await profileServices.deleteCoupleUser(requestData);
      if (status === (200 || 201)) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const getCouples = createAsyncThunk(
    'getCouples',
    async (requestData, {dispatch}) => {
      try {
        console.log("getCouples started");
        const {status, data} = await profileServices.getAllCouples(requestData);
        if (status === (200 || 201)) {
          console.log(data)
          console.log("getCouples ended");
          return data;
        }
        console.log("getCouples ended");
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const contactUs = createAsyncThunk(
    'contactUs',
    async (requestData, {dispatch}) => {
      try {
        const {status, data} = await profileServices.contactUs(requestData);
        if (status === (200 || 201)) {
          return data;
        }
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const sendEmail = createAsyncThunk(
    'sendEmail',
    async (requestData, {dispatch}) => {
      try {
        const {status, data} = await profileServices.sendEmail(requestData);
        if (status === (200 || 201)) {
          return data;
        }
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const changePasssword = createAsyncThunk(
  'changePasssword',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await profileServices.changePassword(requestData);
      if (status === (200 || 201)) {
        dispatch(
          messageHandlerSet({
            message: 'Password Change Successfully',
            status: TOAST_STATUS.SUCCESS,
          }),
        );
        // goBack();
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,

  extraReducers: builder => {
    //  get user profile
    builder.addCase(getUserProfile.pending, state => {
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.user = action.payload;
      state.isLoading = false;
      state.isFetching = false;
      console.log(state.user);
      localStorage.setItem('user', JSON.stringify(state.user));
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.isError = true;
      state.isLoading = false;
      state.isFetching = false;
    });

    //  update user profile
    builder.addCase(updateUserProfile.pending, state => {
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.isError = true;
      state.isLoading = false;
    });

    //  change password
    builder.addCase(changePasssword.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(changePasssword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(changePasssword.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    //  delete vendor
    builder.addCase(deleteVendorUser.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(deleteVendorUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteVendorUser.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    //  delete couple
    builder.addCase(deleteCoupleUser.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(deleteCoupleUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteCoupleUser.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    //  get All Couples
    builder.addCase(getCouples.pending, state => {
      state.couples.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(getCouples.fulfilled, (state, action) => {
      state.couples.isLoading = false;
      state.couples.coupleList = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getCouples.rejected, (state, action) => {
      state.couples.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    //  contact Email
    builder.addCase(contactUs.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(contactUs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(contactUs.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    //  send Email
    builder.addCase(sendEmail.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(sendEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });
  },
  reducers: {},
});

const persistConfig = {
  key: 'profileSlice',
  storage: localStorage,
  blacklist: ['isError', 'isSuccess', 'isLoading'],
  timeout: null,
};

export default persistReducer(persistConfig, profileSlice.reducer);