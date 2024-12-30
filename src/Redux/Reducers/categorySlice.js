import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import { errorHandler } from '../Utils/errorHandler';
import categoryServices from '../Services/categoryServices';
import { errorHandler } from '../Utils/errorHandler';

const initialState = {
  categoryItem: {
    isLoading: false,
    categories: [],
  },
  categoryPreferencesItem: {
    isLoading: false,
    categoryPreferences: [],
  },
  vendorReviewsItem: {
    isLoading: false,
    reviews: [],
  },
  detailsItem: {
    isLoading: true,
    details: null,
    vendorId: null,
  },
  vendorItem: {
    isLoading: false,
    isRefreshing: false,
    moreLoading: false,
    page: 1,
    total: undefined,
    totalPages: undefined,
    vendors: [],
  },

  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const getCategoryList = createAsyncThunk(
  'getCategoryList',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await categoryServices.getCategoryList();
      if (status === (200 || 201)) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const getCategoryPreferencesList = createAsyncThunk(
  'getCategoryPreferencesList',
  async (id, {dispatch}) => {
    try {
      const {status, data} =
        await categoryServices.getCategoriesPreferencesList(id);
      if (status === (200 || 201)) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const getListOfVendors = createAsyncThunk(
  'getListOfVendors',
  async (requestData, {dispatch}) => {
    try {
      console.log(requestData);
      const {status, data} = await categoryServices.getListOfVendors(
        requestData,
      );
      if (status === (200 || 201)) {
        console.log(data);
        console.log(requestData);
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const getVendorDetails = createAsyncThunk(
    'getVendorDetails',
    async (id, {dispatch}) => {
      try {
        const {status, data} = await categoryServices.getVendorDetails(id);
        if (status === 200 || status === 201) {
          console.log(data);
          return data;
        }
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const noAuthGetVendorDetails = createAsyncThunk(
    'noAuthGetVendorDetails',
    async (id, {dispatch}) => {
      try {
        const {status, data} = await categoryServices.noAuthGetVendorDetails(id);
        if (status === 200 || status === 201) {
          console.log(data);
          return data;
        }
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const getVendorsReviews = createAsyncThunk(
  'getVendorsReviews',
  async (id, {dispatch}) => {
    try {
      const {status, data} = await categoryServices.getVendorReviews(id);
      if (status === (200 || 201)) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const addVendorPreferencesInEvent = createAsyncThunk(
  'addVendorPreferencesInEvent',
  async ({requestData, onDone}, {dispatch}) => {
    try {
      const {status, data} = await categoryServices.addVendorPreferencesInEvent(
        requestData,
      );
      if (status === (200 || 201)) {
        onDone();
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,

  extraReducers: builder => {
    //  get categories list
    builder.addCase(getCategoryList.pending, state => {
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
      state.categoryItem.isLoading = true;
    });
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.categoryItem.categories = action.payload;
      state.categoryItem.isLoading = false;
    });
    builder.addCase(getCategoryList.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.isError = true;
      state.categoryItem.isLoading = false;
    });

    //  get category preferences list
    builder.addCase(getCategoryPreferencesList.pending, state => {
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
      state.categoryPreferencesItem.isLoading = true;
    });
    builder.addCase(getCategoryPreferencesList.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.categoryPreferencesItem.categoryPreferences = action.payload;
      state.categoryPreferencesItem.isLoading = false;
    });
    builder.addCase(getCategoryPreferencesList.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.isError = true;
      state.categoryPreferencesItem.isLoading = false;
    });

    //  get vendor details
    builder.addCase(getVendorDetails.pending, state => {
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
      state.detailsItem.isLoading = true;
    });
    builder.addCase(getVendorDetails.fulfilled,  (state, action) => {
      console.log(action.payload);
      state.detailsItem.details = action.payload;
      state.isSuccess = true;
      state.detailsItem.isLoading = false;
      console.log("details", state.detailsItem.isLoading);
    });
    builder.addCase(getVendorDetails.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.isError = true;
      state.detailsItem.isLoading = false;
    });

    //  No Auth get vendor details
    builder.addCase(noAuthGetVendorDetails.pending, state => {
      state.errorMessage = '';
      state.isError = false;
      state.isSuccess = false;
      state.detailsItem.isLoading = true;
    });
    builder.addCase(noAuthGetVendorDetails.fulfilled,  (state, action) => {
      state.detailsItem.details = action.payload;
      state.detailsItem.vendorId = action.payload.vendorId;
      state.isSuccess = true;
      state.detailsItem.isLoading = false;
      console.log("details", action.payload);
    });
    builder.addCase(noAuthGetVendorDetails.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      state.isError = true;
      state.detailsItem.isLoading = false;
    });

    //  get vendor list
    builder.addCase(getListOfVendors.pending, (state, action) => {
      const {pageNumber} = action.meta.arg;
      if (pageNumber === 1) {
        state.vendorItem.isLoading = true;
        state.vendorItem.vendors = [];
      } else state.vendorItem.moreLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getListOfVendors.fulfilled, (state, action) => {
      state.vendorItem.isLoading = false;
      state.vendorItem.moreLoading = false;
      state.isSuccess = true;
      state.vendorItem.vendors = action?.payload;
      state.vendorItem.total = action?.payload.totalCount;
      state.vendorItem.page = action?.payload.currentPage;
      state.vendorItem.isRefreshing = false;
      state.vendorItem.totalPages = action.payload?.totalPages;
      // console.log(state.vendorItem.vendors);
      // console.log(action.payload);
    });
    builder.addCase(getListOfVendors.rejected, (state, action) => {
      state.vendorItem.isLoading = false;
      state.vendorItem.moreLoading = false;
      state.isError = true;
      state.vendorItem.isRefreshing = false;
      state.errorMessage = action.error.message;
    });

    // get vendor reviews
    builder.addCase(getVendorsReviews.pending, (state, action) => {
      state.vendorReviewsItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getVendorsReviews.fulfilled, (state, action) => {
      state.vendorReviewsItem.isLoading = false;
      state.isSuccess = true;
      state.vendorReviewsItem.reviews = action.payload;
    });
    builder.addCase(getVendorsReviews.rejected, (state, action) => {
      state.vendorReviewsItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // add vendor preferences
    builder.addCase(addVendorPreferencesInEvent.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(addVendorPreferencesInEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(addVendorPreferencesInEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {},
});

export default categorySlice.reducer;