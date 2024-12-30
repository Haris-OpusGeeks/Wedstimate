import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import authServices from '../Services/authServices';
import { DESTROY_SESSION } from '../Constants/types';
import { TOAST_STATUS } from '../Constants/enum';
import localStore, {saveAccessToken, saveUser, saveRefreshToken} from '../Utils/localStore';
import { errorHandler } from '../Utils/errorHandler';
import persistReducer from 'redux-persist/es/persistReducer';
import { messageHandlerSet } from './messageHandlerSlice';
import localStoreUtil from '../Utils/localStore';


const initialState = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  userRole: null,
  errorMessage: '',
};

const saveUserInformation = (data, dispatch) => {
  if (localStorage.getItem('user')){
    return null
  } else {
    saveAccessToken(data?.token);
    saveRefreshToken(data?.refreshToken);
    dispatch(
      messageHandlerSet({
        message: data.message,
        status: TOAST_STATUS.SUCCESS,
      }),
    );
  }
};

export const loginUser = createAsyncThunk(
  'loginUser',
  async ({requestData, onDone}, {dispatch}) => {
    try {
      const {status, data} = await authServices.loginUser(requestData);
      if (status === 200 ||status===201) {
        saveUserInformation(data, dispatch);
        onDone();
        console.log(data);
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const registerCouples = createAsyncThunk(
  'registerCouples',
  async ({requestData, onDone}, {dispatch}) => {
    try {
      const {status, data} = await authServices.registerCouples(requestData);
      if (status === 200 ||status===201) {
        saveUserInformation(data, dispatch);
        onDone();
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const registerCouplesInBulk = createAsyncThunk(
  'registerCouplesInBulk',
  async ({formData}, {dispatch}) => {
    try {
      const {status, data} = await authServices.registerCouplesBulk(formData);
      if (status === 200 ||status===201) {
        // saveUserInformation(data, dispatch);
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const registerVendor = createAsyncThunk(
  'registerVendor',
  async ({requestData, onDone}, {dispatch}) => {
    try {
      const {status, data} = await authServices.registerVendor(requestData);
      if (status === 200 ||status===201) {
        saveUserInformation(data, dispatch);
        onDone();
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const registerVendorByAdmin = createAsyncThunk(
    'registerVendorByAdmin',
    async ({formData}, {dispatch}) => {
      try {
        const {status, data} = await authServices.registerVendorByAdmin(formData);
        if (status === 200 ||status===201) {
          return data;
        }
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async ({requestData, onDone}, {dispatch}) => {
    try {
      const {status, data} = await authServices.forgotPassword(requestData);
      if (status === 200 ||status===201) {
        onDone(data);
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,

  extraReducers: builder => {
    //  register couples
    builder.addCase(registerCouples.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(registerCouples.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.accessToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userRole = action.payload.profileType;
    });
    builder.addCase(registerCouples.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    //  register couples In Bulk
    builder.addCase(registerCouplesInBulk.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(registerCouplesInBulk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(registerCouplesInBulk.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    //  register vendor
    builder.addCase(registerVendor.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(registerVendor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.accessToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userRole = action.payload.profileType;
    });
    builder.addCase(registerVendor.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    //  register vendor by admin
    builder.addCase(registerVendorByAdmin.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(registerVendorByAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
    });
    builder.addCase(registerVendorByAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    //  login user
    builder.addCase(loginUser.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.accessToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userRole = action.payload.profileType;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    //  forgot password
    builder.addCase(forgotPassword.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });

    //  logout user
    builder.addCase(DESTROY_SESSION, state => {
      state.isLoggedIn = false;
      state.refreshToken = null;
      state.userRole = null;
      state.accessToken = null;
      localStoreUtil.removeAll();
    });
  },
  reducers: {
  },
});

const persistConfig = {
  key: 'authSlice',
  storage: localStore,
  blacklist: ['isError', 'isSuccess', 'isLoading'],
  timeout: null,
};

export default persistReducer(persistConfig, authSlice.reducer);
export const { setLoginState, logout } = authSlice.actions;
export const {isLoggedIn} = authSlice.reducer;