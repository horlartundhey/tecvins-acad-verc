import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/auth/login', credentials);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Login failed'
            );
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/auth/register', userData);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Registration failed'
            );
        }
    }
);

// Verifies the stored token is still valid and restores user state
export const verifyToken = createAsyncThunk(
    'auth/verifyToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/auth/profile');
            return response.data;
        } catch (error) {
            return rejectWithValue('Token invalid or expired');
        }
    }
);

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isInitializing: !!localStorage.getItem('token'),
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isInitializing = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // When redux-persist rehydrates the store, reset isInitializing
            // based on whether there's a token — we always need to verify it
            .addCase('persist/REHYDRATE', (state, action) => {
                const token = action.payload?.auth?.token || localStorage.getItem('token');
                if (token) {
                    state.isInitializing = true;
                } else {
                    state.isInitializing = false;
                    state.isAuthenticated = false;
                    state.user = null;
                    state.token = null;
                }
            })
            // Verify Token
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.isInitializing = false;
            })
            .addCase(verifyToken.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.isInitializing = false;
                localStorage.removeItem('token');
            })
            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.token = action.payload.token;
                state.isInitializing = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.token = action.payload.token;
                state.isInitializing = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
