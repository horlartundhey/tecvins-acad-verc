import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

// Async thunk for fetching dashboard stats
export const fetchDashboardStats = createAsyncThunk(
    'dashboard/fetchStats',    async (_, { rejectWithValue }) => {
        try {
            // Check if user has token before making request
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found - aborting dashboard stats request');
                window.location.replace('/login');
                return rejectWithValue('No authentication token');
            }
            
            const response = await apiService.get('/admin/stats');
            return response.data;
        } catch (error) {
            console.log('Dashboard stats request failed:', error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats');
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        stats: {
            students: { total: 0, pending: 0, approved: 0, rejected: 0 },
            trainers: { total: 0, pending: 0, approved: 0, rejected: 0 },
            blogs: { total: 0, published: 0, draft: 0 },
            contacts: { total: 0, pending: 0, responded: 0, closed: 0 },
            partners: { total: 0, pending: 0, approved: 0, rejected: 0 },
            users: { total: 0, admins: 0, editors: 0 }
        },
        recentActivities: {
            students: [],
            trainers: [],
            blogs: []
        },        isLoading: false,
        error: null,
        hasLoaded: false
    },
    reducers: {
        resetDashboard: (state) => {
            state.hasLoaded = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {                state.isLoading = false;
                state.hasLoaded = true;
                state.stats = action.payload.stats;
                state.recentActivities = action.payload.recentActivities;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                // Prevent infinite retries on auth errors
                if (action.payload && (action.payload.includes('401') || action.payload.includes('unauthorized') || action.payload.includes('Not authorized'))) {
                    state.hasLoaded = true; // Stop retrying on auth errors
                }
            });
    }
});

export default dashboardSlice.reducer;
