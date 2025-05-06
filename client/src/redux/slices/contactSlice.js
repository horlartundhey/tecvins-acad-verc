import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const submitContactForm = createAsyncThunk(
    'contact/submit',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/contact', formData);
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

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitContactForm.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(submitContactForm.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(submitContactForm.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearMessages } = contactSlice.actions;
export default contactSlice.reducer;