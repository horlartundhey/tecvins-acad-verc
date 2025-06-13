import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const submitStudentApplication = createAsyncThunk(
    'students/submit',
    async (applicationData, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/students/apply', applicationData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAllStudentApplications = createAsyncThunk(
    'students/getAll',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/students/applications', { params: filters });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateStudentApplicationStatus = createAsyncThunk(
    'students/updateStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await apiService.put(`/students/applications/${id}`, { status });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteStudentApplication = createAsyncThunk(
    'students/delete',
    async (id, { rejectWithValue }) => {
        try {
            await apiService.delete(`/students/applications/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete application');
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

const studentSlice = createSlice({
    name: 'students',
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
            .addCase(submitStudentApplication.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(submitStudentApplication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message || 'Application submitted successfully';
                state.error = null;
            })
            .addCase(submitStudentApplication.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An unexpected error occurred';
                state.successMessage = null;
            })
            // Get all applications
            .addCase(getAllStudentApplications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllStudentApplications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.applications = action.payload;
            })
            .addCase(getAllStudentApplications.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update application status
            .addCase(updateStudentApplicationStatus.fulfilled, (state, action) => {
                state.applications = state.applications.map(app => 
                    app._id === action.payload._id ? action.payload : app
                );
                state.successMessage = 'Application status updated successfully';
            })
            .addCase(updateStudentApplicationStatus.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Delete application
            .addCase(deleteStudentApplication.fulfilled, (state, action) => {
                state.applications = state.applications.filter(app => app._id !== action.payload);
            });
    }
});

export const { clearError, clearSuccessMessage } = studentSlice.actions;
export default studentSlice.reducer;