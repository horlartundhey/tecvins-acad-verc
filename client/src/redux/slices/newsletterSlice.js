import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const subscribeToNewsletter = createAsyncThunk(
    'newsletter/subscribe',
    async (email, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/newsletter/subscribe', { email });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const unsubscribeFromNewsletter = createAsyncThunk(
    'newsletter/unsubscribe',
    async (email, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/newsletter/unsubscribe', { email });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const initialState = {
    isLoading: false,
    error: null,
    successMessage: null
};

const newsletterSlice = createSlice({
    name: 'newsletter',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribeToNewsletter.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(subscribeToNewsletter.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(unsubscribeFromNewsletter.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
            })
            .addCase(unsubscribeFromNewsletter.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { clearMessages } = newsletterSlice.actions;
export default newsletterSlice.reducer;