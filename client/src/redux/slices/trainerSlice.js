import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const submitTrainerApplication = createAsyncThunk(
    'trainers/submit',
    async (applicationData, { rejectWithValue }) => {
        try {
            // Send JSON data directly
            const response = await apiService.post('/trainers/apply', applicationData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAllTrainerApplications = createAsyncThunk(
    'trainers/getAll',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/trainers/applications', { params: filters });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateTrainerApplicationStatus = createAsyncThunk(
    'trainers/updateStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await apiService.put(`/trainers/applications/${id}`, { status });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const initialState = {
    applications: [],
    currentApplication: null,
    isLoading: false,
    error: null,
    successMessage: null
};

const trainerSlice = createSlice({
    name: 'trainers',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Submit application
            .addCase(submitTrainerApplication.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(submitTrainerApplication.fulfilled, (state) => {
                state.isLoading = false;
                state.successMessage = 'Application submitted successfully';
            })
            .addCase(submitTrainerApplication.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get all applications
            .addCase(getAllTrainerApplications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllTrainerApplications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.applications = action.payload;
            })
            .addCase(getAllTrainerApplications.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update application status
            .addCase(updateTrainerApplicationStatus.fulfilled, (state, action) => {
                state.applications = state.applications.map(app => 
                    app._id === action.payload._id ? action.payload : app
                );
                state.successMessage = 'Application status updated successfully';
            })
            .addCase(updateTrainerApplicationStatus.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { clearError, clearSuccessMessage } = trainerSlice.actions;
export default trainerSlice.reducer;