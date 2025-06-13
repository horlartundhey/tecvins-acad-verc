import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

// Thunk actions
export const createCohort = createAsyncThunk(
    'cohorts/create',
    async (cohortData, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/cohorts', cohortData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create cohort');
        }
    }
);

export const getAllCohorts = createAsyncThunk(
    'cohorts/getAll',
    async (filters = {}, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/cohorts', { params: filters });
            console.log('API Response:', response); // Debug log
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cohorts');
        }
    }
);

export const updateCohort = createAsyncThunk(
    'cohorts/update',
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await apiService.put(`/admin/cohorts/${id}`, updateData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update cohort');
        }
    }
);

export const deleteCohort = createAsyncThunk(
    'cohorts/delete',
    async (id, { rejectWithValue }) => {
        try {
            await apiService.delete(`/cohorts/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete cohort');
        }
    }
);

export const toggleCohortActivation = createAsyncThunk(
    'cohorts/toggleActivation',
    async ({ id, isActive }, { rejectWithValue }) => {
        try {
            const response = await apiService.put(`/admin/cohorts/${id}/activation`, { isActive });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update cohort activation status');
        }
    }
);

// Initial state
const initialState = {
    cohorts: {
        data: [],
        cache: {}
    },
    currentCohort: null,
    isLoading: false,
    error: null,
    successMessage: null
};

// Slice
const cohortSlice = createSlice({
    name: 'cohorts',
    initialState,
    reducers: {
        clearCache: (state) => {
            state.cohorts.cache = {};
        },
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        setCurrentCohort: (state, action) => {
            state.currentCohort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create cohort
            .addCase(createCohort.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(createCohort.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cohorts.data.push(action.payload);
                state.successMessage = 'Cohort created successfully';
                state.cohorts.cache = {}; // Clear cache on successful creation
            })
            .addCase(createCohort.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get all cohorts
            .addCase(getAllCohorts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })            .addCase(getAllCohorts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cohorts.data = action.payload.data || [];
                state.error = null;
                // Cache the response if it's for upcoming cohorts
                if (action.meta.arg?.status === 'upcoming') {
                    state.cohorts.cache.upcoming = {
                        data: action.payload.data,
                        timestamp: Date.now()
                    };
                }
            })
            .addCase(getAllCohorts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update cohort
            .addCase(updateCohort.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateCohort.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cohorts.data = state.cohorts.data.map(cohort =>
                    cohort._id === action.payload._id ? action.payload : cohort
                );
                state.successMessage = 'Cohort updated successfully';
                state.cohorts.cache = {}; // Clear cache on successful update
            })
            .addCase(updateCohort.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete cohort
            .addCase(deleteCohort.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteCohort.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cohorts.data = state.cohorts.data.filter(cohort => cohort._id !== action.payload);
                if (state.currentCohort?._id === action.payload) {
                    state.currentCohort = null;
                }
                state.successMessage = 'Cohort deleted successfully';
            })
            .addCase(deleteCohort.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Toggle cohort activation
            .addCase(toggleCohortActivation.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(toggleCohortActivation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cohorts.data = state.cohorts.data.map(cohort =>
                    cohort._id === action.payload._id ? action.payload : cohort
                );
                state.successMessage = `Cohort ${action.payload.isActive ? 'activated' : 'deactivated'} successfully`;
                state.cohorts.cache = {}; // Clear cache on successful update
            })
            .addCase(toggleCohortActivation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearCache, clearMessages, setCurrentCohort } = cohortSlice.actions;
export default cohortSlice.reducer;