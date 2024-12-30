import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { errorHandler } from '../Utils/errorHandler';
import blogServices from '../Services/blogServices';
// import profileServices from "../Services/profileServices.js";
import {messageHandlerSet} from "./messageHandlerSlice.js";
import {TOAST_STATUS} from "../Constants/enum.js";
// import dashboardServices from "../Services/dashbaordServices.js";
// import {getDashboardDetails} from "./dashboardSlice.js";

const initialState = {
  blogs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const getListOfBlogs = createAsyncThunk(
  'getListOfBlogs',
  async (id, {dispatch}) => {
    try {
      const {status, data} =
          await blogServices.getListOfBlogs(id);
      if (status === (200 || 201)) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const createBlog = createAsyncThunk(
  'createBlog',
  async ({formData}, {dispatch}) => {
    try {
      const {status, data} = await blogServices.createBlog(formData);
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const updateBlog = createAsyncThunk(
    'updateBlog',
    async ({formData}, {dispatch}) => {
      try {
        const {status, data} = await blogServices.updateBlog(formData);
        if (status === (200 || 201)) {
          dispatch(
              messageHandlerSet({
                message: 'Blog Updated Successfully',
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

export const deleteBlog = createAsyncThunk(
    'deleteBlog',
    async (requestData, {dispatch}) => {
      try {
        console.log(requestData);
        const {status, data} = await blogServices.deleteBlog(requestData);
        if (status === (200 || 201)) {
          return data;
        }
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,

  extraReducers: builder => {
    //  get vendor deal list
    builder.addCase(getListOfBlogs.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getListOfBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blogs = action.payload;
    });
    builder.addCase(getListOfBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // create deal
    builder.addCase(createBlog.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(createBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    //  update Blog
    builder.addCase(updateBlog.pending, state => {
      state.isLoading = true;
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
      state.isError = true;
    });
    
    // delete Blog
    builder.addCase(deleteBlog.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(deleteBlog.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {},
});

export default blogSlice.reducer;