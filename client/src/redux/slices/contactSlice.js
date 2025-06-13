import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const submitContactForm = createAsyncThunk(
    'contact/submit',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/contact', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to submit contact form');
        }
    }
);

// NEW: Fetch all contacts (admin)
export const fetchAllContacts = createAsyncThunk(
    'contact/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/contact');
            return response.data.data; // assuming response.data.data is the array
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch contacts');
        }
    }
);

// Delete a contact message
export const deleteContact = createAsyncThunk(
    'contact/delete',
    async (id, { rejectWithValue }) => {
        try {
            await apiService.delete(`/contact/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete contact');
        }
    }
);

// Update contact status
export const updateContactStatus = createAsyncThunk(
    'contact/updateStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await apiService.put(`/contact/${id}`, { status });
            return response.data.data; // updated contact
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update status');
        }
    }
);

const initialState = {
    isLoading: false,
    error: null,
    successMessage: null,
    contacts: [], // NEW: store all contacts
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
                state.error = null;
            })
            .addCase(submitContactForm.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to send message';
                state.successMessage = null;
            })
            // NEW: fetchAllContacts
            .addCase(fetchAllContacts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchAllContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch contacts';
            })
            // Delete contact
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(c => c._id !== action.payload);
            })
            // Update contact status
            .addCase(updateContactStatus.fulfilled, (state, action) => {
                const updated = action.payload;
                state.contacts = state.contacts.map(c => c._id === updated._id ? updated : c);
            });
    }
});

export const { clearMessages } = contactSlice.actions;
export default contactSlice.reducer;