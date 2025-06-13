import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const submitWaitlist = createAsyncThunk(
    'waitlist/submitWaitlist',
    async (data, { rejectWithValue }) => {
        try {
            console.log('=== REDUX WAITLIST SUBMISSION ===');
            console.log('Original data:', JSON.stringify(data, null, 2));

            // Transform cohortId to preferredCohort
            const transformedData = {
                ...data,
                preferredCohort: data.cohortId
            };
            delete transformedData.cohortId;

            console.log('Transformed data:', JSON.stringify(transformedData, null, 2));
            console.log('Making API call to /waitlist...');
            
            const response = await api.post('/waitlist', transformedData);
            
            console.log('=== REDUX API RESPONSE ===');
            console.log('Full response:', JSON.stringify(response, null, 2));
            console.log('Response data:', JSON.stringify(response.data, null, 2));
            console.log('Response status:', response.status);
            
            return response.data;
        } catch (error) {
            console.error('=== REDUX WAITLIST ERROR ===');
            console.error('Error object:', error);
            console.error('Error message:', error.message);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
            
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getWaitlist = createAsyncThunk(
    'waitlist/getWaitlist',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/waitlist');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateWaitlistStatus = createAsyncThunk(
    'waitlist/updateWaitlistStatus',
    async ({ id, status, notifyStudent = true }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/waitlist/${id}`, { status, notifyStudent });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const waitlistSlice = createSlice({
    name: 'waitlist',
    initialState: {
        entries: [],
        isLoading: false,
        error: null,
        successMessage: null
    },
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Submit waitlist
            .addCase(submitWaitlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })            .addCase(submitWaitlist.fulfilled, (state, action) => {
                console.log('=== REDUX WAITLIST FULFILLED ===');
                console.log('Action payload:', JSON.stringify(action.payload, null, 2));
                
                state.isLoading = false;
                
                // Handle different response formats from backend
                const waitlistEntry = action.payload.data || action.payload;
                console.log('Extracted waitlist entry:', JSON.stringify(waitlistEntry, null, 2));
                
                if (waitlistEntry) {
                    state.entries.push(waitlistEntry);
                }
                
                state.successMessage = action.payload.message || 'Successfully joined waitlist';
                console.log('Success message set:', state.successMessage);
            })
            .addCase(submitWaitlist.rejected, (state, action) => {
                console.error('=== REDUX WAITLIST REJECTED ===');
                console.error('Action payload:', action.payload);
                
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get waitlist
            .addCase(getWaitlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })            .addCase(getWaitlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.entries = action.payload.data || action.payload;
            })
            .addCase(getWaitlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update waitlist status
            .addCase(updateWaitlistStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })            .addCase(updateWaitlistStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedEntry = action.payload.data || action.payload;
                state.entries = state.entries.map(entry =>
                    entry._id === updatedEntry._id ? updatedEntry : entry
                );
                state.successMessage = action.payload.message || 'Successfully updated waitlist status';
            })
            .addCase(updateWaitlistStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearMessages } = waitlistSlice.actions;
export default waitlistSlice.reducer;
