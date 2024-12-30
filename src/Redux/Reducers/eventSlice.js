import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import eventServices from "../Services/eventServices.js";
import {errorHandler} from "../Utils/errorHandler.js";

const initialState = {
    eventsItem: {
        isLoading: false,
        events: [],
    },

    eventDetails: {
        isLoading: false,
        details: null,
        estimatedCost: 0,
    },

    isSuccess: false,
    isLoading: false,
    isError: false,
    errorMessage: '',
};

export const getListOfEvents = createAsyncThunk(
    'getListOfEvents',
    async (requestData, {dispatch}) => {
        try {
            const {status, data} = await eventServices.getListOfEvents();
            if (status === 200 || status === 201) {
                return data;
            }
        } catch (error) {
            throw errorHandler(error, dispatch);
        }
    },
);

export const createEvent = createAsyncThunk(
    'createEvent',
    async ({requestData, onDone}, {dispatch}) => {
        try {
            const {status, data} = await eventServices.createEvent(requestData);
            if (status === 200 || status === 201) {
                onDone(data);
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
            const {status, data} = await eventServices.getEventDetailsById(id);
            if (status === 200 || status === 201) {
                return data;
            }
        } catch (error) {
            throw errorHandler(error, dispatch);
        }
    },
);

export const eventSlice = createSlice({
    name: 'eventSlice',
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

        // create event
        builder.addCase(createEvent.pending, state => {
            state.errorMessage = '';
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = true;
        });
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
        });
        builder.addCase(createEvent.rejected, (state, action) => {
            state.errorMessage = action.error.message;
            state.isError = true;
            state.isLoading = false;
        });

        //  get events details
        builder.addCase(getEventDetailsById.pending, state => {
            state.eventDetails.isLoading = true;
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
            state.eventDetails.isLoading = false;
            state.isSuccess = true;
            state.eventDetails.details = {
                id,
                zipCode,
                date,
                noOfGuest,
                name,
                isOpen,
                pieChart,
                data: [...deals, ...vendorPreferences, ...packageDetails],
            };
            state.eventDetails.estimatedCost = [
                ...deals,
                ...vendorPreferences,
                ...packageDetails,
            ].reduce(
                (accumulator, currentValue) => accumulator + currentValue?.price,
                0,
            );
        });
        builder.addCase(getEventDetailsById.rejected, (state, action) => {
            state.eventDetails.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        //  clear event details on unmount
        clearEventDetails(state) {
            state.eventDetails.details = null;
            state.eventDetails.estimatedCost = 0;
        },
    },
});

export const {clearEventDetails} = eventSlice.actions;
export default eventSlice.reducer;