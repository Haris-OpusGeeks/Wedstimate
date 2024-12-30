import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { errorHandler } from '../Utils/errorHandler';
import paymentServices from "../Services/paymentServices.js";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
}

export const extendFreeTrial = createAsyncThunk(
    'extendFreeTrial',
    async (requestData, {dispatch}) => {
        // console.log('trying');
        try {
            const {status, data} = await paymentServices.extendFreeTrial();
            if (status === 200 || status === 201) {
                console.log(data);
                return data;
            }
        } catch (error) {
            console.log(error);
            throw errorHandler(error, dispatch);
        }
    },
);

export const leadsSlice = createSlice({
    name: 'leadsSlice',
    initialState,

    extraReducers: builder => {
        //  get all time leads list
        builder.addCase(extendFreeTrial.pending, state => {
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = '';
        });
        builder.addCase(extendFreeTrial.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action.payload);
        });
        builder.addCase(extendFreeTrial.rejected, (state, action) => {
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {},
});