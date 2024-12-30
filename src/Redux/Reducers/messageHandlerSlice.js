import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: undefined,
  message: undefined,
};

export const messageHandlerSlice = createSlice({
  name: 'messageHandlerSlice',
  initialState,
  reducers: {
    messageHandlerSet(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    messageHandlerReset(state, action) {
      state.status = undefined;
      state.message = undefined;
    },
  },
});

export const {messageHandlerSet, messageHandlerReset} =
  messageHandlerSlice.actions;

export default messageHandlerSlice.reducer;