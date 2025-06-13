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

export const updatePartnershipStatus = createAsyncThunk(
    'partners/updateStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await apiService.put(`/partners/${id}`, { status });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deletePartnership = createAsyncThunk(
    'partners/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiService.delete(`/partners/${id}`);
            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const exportPartnerships = createAsyncThunk(
    'partners/export',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/partners/export');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const initialState = {
    partnerships: [],
    currentPartnership: null,
    isLoading: false,
    error: null,
    successMessage: null,
    exportData: null
};

const partnerSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        setCurrentPartnership: (state, action) => {
            state.currentPartnership = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Submit partnership
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
            // Get all partnerships
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
            })
            // Update partnership status
            .addCase(updatePartnershipStatus.fulfilled, (state, action) => {
                state.partnerships = state.partnerships.map(partner => 
                    partner._id === action.payload.data._id ? action.payload.data : partner
                );
                state.successMessage = action.payload.message;
            })
            .addCase(updatePartnershipStatus.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Delete partnership
            .addCase(deletePartnership.fulfilled, (state, action) => {
                state.partnerships = state.partnerships.filter(partner => partner._id !== action.payload.id);
                state.successMessage = action.payload.message;
            })
            .addCase(deletePartnership.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Export partnerships
            .addCase(exportPartnerships.fulfilled, (state, action) => {
                state.exportData = action.payload.data;
            })
            .addCase(exportPartnerships.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { clearMessages, setCurrentPartnership } = partnerSlice.actions;
export default partnerSlice.reducer;