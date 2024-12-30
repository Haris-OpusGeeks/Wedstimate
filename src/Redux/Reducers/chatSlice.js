import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { base_url } from '../Utils/helper';
import { errorHandler } from '../Utils/errorHandler';
import chatServices from '../Services/chatServices';
import { CLEAR_CHAT_LIST } from '../Constants/types';

const initialState = {
  messagesListItem: {
    isLoading: false,
    messages: [],
  },
  chatItem: {
    isLoading: false,
    chats: [],
  },
  reviewItem: {
    isLoading: false,
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const getMessagesList = createAsyncThunk(
  'getMessagesList',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await chatServices.getMessagesList();
      if (status === 200 || status === 201) {
        // console.log(data);
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const getChatMessages = createAsyncThunk(
  'getChatMessages',
  async (id, {dispatch}) => {
    try {
      const {status, data} = await chatServices.getChatMessages(id);
      if (status === 200 || status === 201) {
        dispatch(markMessagesRead(id));
        console.log(data);
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const markMessagesRead = createAsyncThunk(
  'markMessagesRead',
  async (id, {dispatch}) => {
    try {
      const {status, data} = await chatServices.markMessagesRead(id);
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (error) {
      console.log(error, 'mark read');
      throw errorHandler(error, dispatch);
    }
  },
);

export const sendMessage = createAsyncThunk(
  'sendMessage',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await chatServices.sendMessage(requestData);
      if (status === 200 || status === 201) {
        // onDone();
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const createRoomForVendorPreference = createAsyncThunk(
  'createRoomForVendorPreference',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await chatServices.createRoomForVendorPreference(
        requestData,
      );
      if (status === 200 || status === 201) {
        console.log(data, 'createRoomForVendorPreference');
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const createRoomForDeal = createAsyncThunk(
  'createRoomForDeal',
  async (requestData, {dispatch}) => {
    try {
      const {status, data} = await chatServices.createRoomForDeal(requestData);
      if (status === 200 || status === 201) {
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);


export const addReview = createAsyncThunk(
  'addReview',
  async ({requestData}, {dispatch}) => {
    try {
      console.log("request", requestData);
      const {status, data} = await chatServices.addReview(requestData);
      if (status === 200 || status === 201) {
        // onDone();
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const adminAddReview = createAsyncThunk(
    'adminAddReview',
    async ({requestData}, {dispatch}) => {
      try {
        console.log("request", requestData);
        const {status, data} = await chatServices.adminAddReview(requestData);
        if (status === 200 || status === 201) {
          // onDone();
          return data;
        }
      } catch (error) {
        throw errorHandler(error, dispatch);
      }
    },
);

export const deleteReview = createAsyncThunk(
  'deleteReview',
  async ({requestData}, {dispatch}) => {
    try {
      console.log("request", requestData);
      const {status, data} = await chatServices.deleteReview(requestData);
      if (status === 200 || status === 201) {
        // onDone();
        return data;
      }
    } catch (error) {
      throw errorHandler(error, dispatch);
    }
  },
);

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,

  extraReducers: builder => {
    //  get user chat
    builder.addCase(getChatMessages.pending, state => {
      state.chatItem.chats = [];
      state.chatItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getChatMessages.fulfilled, (state, action) => {
      state.chatItem.isLoading = false;
      state.chatItem.chats = action.payload?.map((element, index) => {
        return {
          ...element,
          _id: element?.id,

          user: {
            ...element?.user,
            _id: element?.user?.id,
            avatar: `${base_url}/${element?.user?.avatar}`,
          },
        };
      });
      state.isSuccess = true;
    });
    builder.addCase(getChatMessages.rejected, (state, action) => {
      state.chatItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    //  get message list
    builder.addCase(getMessagesList.pending, state => {
      state.messagesListItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(getMessagesList.fulfilled, (state, action) => {
      state.messagesListItem.isLoading = false;
      state.messagesListItem.messages = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getMessagesList.rejected, (state, action) => {
      state.messagesListItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    //  send message
    builder.addCase(sendMessage.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(sendMessage.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    //  send message
    builder.addCase(markMessagesRead.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(markMessagesRead.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(markMessagesRead.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    //  create room for vendor preference
    builder.addCase(createRoomForVendorPreference.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(createRoomForVendorPreference.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(createRoomForVendorPreference.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    //  create room for deal
    builder.addCase(createRoomForDeal.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(createRoomForDeal.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(createRoomForDeal.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // add review 
    builder.addCase(addReview.pending, state => {
      state.reviewItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(addReview.fulfilled, state => {
      state.reviewItem.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(addReview.rejected, (state, action) => {
      state.reviewItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // add admin review
    builder.addCase(adminAddReview.pending, state => {
      state.reviewItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(adminAddReview.fulfilled, state => {
      state.reviewItem.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(adminAddReview.rejected, (state, action) => {
      state.reviewItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    // delete review
    builder.addCase(deleteReview.pending, state => {
      state.reviewItem.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    });
    builder.addCase(deleteReview.fulfilled, state => {
      state.reviewItem.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.reviewItem.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    builder.addCase(CLEAR_CHAT_LIST, state => {
      state.chatItem.chats = [];
    });
  },
  reducers: {},
});

export default chatSlice.reducer;