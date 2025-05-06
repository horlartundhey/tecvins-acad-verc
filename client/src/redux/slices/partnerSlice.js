import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const submitPartnership = createAsyncThunk(
    'partners/submit',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/partners', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAllPartnerships = createAsyncThunk(
    'partners/getAll',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/partners', { params: filters });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const initialState = {
    partnerships: [],
    isLoading: false,
    error: null,
    successMessage: null
};

const partnerSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitPartnership.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(submitPartnership.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(submitPartnership.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getAllPartnerships.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPartnerships.fulfilled, (state, action) => {
                state.isLoading = false;
                state.partnerships = action.payload.data;
            })
            .addCase(getAllPartnerships.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearMessages } = partnerSlice.actions;
export default partnerSlice.reducer;