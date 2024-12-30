import notificationServices from "../Services/notificationServices.js";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {errorHandler} from "../Utils/errorHandler.js";

const initialState = {
    notifications: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
}

export const getListOfAllNotifications = createAsyncThunk(
    'getListOfNotifications',
    async (_, {dispatch}) => {
        console.log("getListOfNotifications called");
        try{
            const {status, data} = await notificationServices.getListOfNotifications();
            if (status === 200 || status === 201) {
                console.log(data);
                return data;
            }
        } catch (error) {
            console.log(errorHandler(error, dispatch));
        }
    }
)

export const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState,
    extraReducers: builder => {
        builder.addCase(getListOfAllNotifications.pending, state => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = "";
        });
        builder.addCase(getListOfAllNotifications.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.notifications = action.payload;
        });
        builder.addCase(getListOfAllNotifications.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.errorMessage = action.error.message;
        });
    }
})

export default notificationSlice.reducer;