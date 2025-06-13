import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

// Helper function to build FormData properly
const buildFormData = (data) => {
    if (data instanceof FormData) {
        return data;
    }

    const formData = new FormData();
    
    // Handle each field with proper validation
    if (data.title) {
        formData.append('title', data.title.toString().trim());
    }
    
    if (data.content) {
        formData.append('content', data.content.toString().trim());
    }
    
    if (data.status) {
        formData.append('status', data.status.toString());
    }
    
    // Handle tags - ensure it's always a JSON string
    if (data.tags) {
        if (Array.isArray(data.tags)) {
            formData.append('tags', JSON.stringify(data.tags));
        } else if (typeof data.tags === 'string') {
            try {
                // Try to parse if it's already JSON
                JSON.parse(data.tags);
                formData.append('tags', data.tags);
            } catch {
                // If not JSON, treat as comma-separated string
                const tagsArray = data.tags.split(',').map(t => t.trim()).filter(Boolean);
                formData.append('tags', JSON.stringify(tagsArray));
            }
        }
    } else {
        formData.append('tags', JSON.stringify([]));
    }
    
    // Handle file upload
    if (data.featuredImage && data.featuredImage instanceof File) {
        formData.append('featuredImage', data.featuredImage, data.featuredImage.name);
    }
    
    return formData;
};

// Helper function to log FormData for debugging
const logFormData = (formData, action) => {
    console.log(`=== ${action} FormData Debug Info ===`);
    if (formData instanceof FormData) {
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: File(name: ${value.name}, size: ${value.size}, type: ${value.type})`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }
    } else {
        console.log('Not FormData:', formData);
    }
    console.log('=== End Debug Info ===');
};

export const createBlogPost = createAsyncThunk(
    'blogs/create',
    async (blogData, { rejectWithValue }) => {
        try {
            const formData = buildFormData(blogData);
            
            // Log for debugging
            logFormData(formData, 'CREATE');
            
            // Don't set Content-Type header for FormData - let browser set it with boundary
            const response = await apiService.post('/blogs', formData);
            
            console.log('Blog created successfully:', response.data);
            return response.data;
            
        } catch (error) {
            console.error('Blog creation error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                message: error.message
            });
            
            const errorMessage = error.response?.data?.message 
                || error.response?.data?.error 
                || error.message 
                || 'Failed to create blog post';
                
            return rejectWithValue(errorMessage);
        }
    }
);

export const getAllBlogs = createAsyncThunk(
    'blogs/getAll',
    async (status, { rejectWithValue }) => {
        try {
            const url = '/blogs' + (status ? `?status=${status}` : '');
            const response = await apiService.get(url);
            console.log('Blogs fetched successfully:', response.data?.length || 0, 'blogs');
            return response.data;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            const errorMessage = error.response?.data?.message 
                || error.response?.data?.error 
                || error.message 
                || 'Failed to fetch blogs';
            return rejectWithValue(errorMessage);
        }
    }
);

export const getDraftBlogs = createAsyncThunk(
    'blogs/getDrafts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/blogs/drafts');
            console.log('Draft blogs fetched successfully:', response.data?.length || 0, 'blogs');
            return response.data;
        } catch (error) {
            console.error('Error fetching draft blogs:', error);
            const errorMessage = error.response?.data?.message 
                || error.response?.data?.error 
                || error.message 
                || 'Failed to fetch draft blogs';
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateBlogPost = createAsyncThunk(
    'blogs/update',
    async ({ id, blogData }, { rejectWithValue }) => {
        try {
            if (!id) {
                throw new Error('Blog ID is required for update');
            }
            
            const formData = buildFormData(blogData);
            
            // Log for debugging
            logFormData(formData, 'UPDATE');
            
            // Don't set Content-Type header for FormData
            const response = await apiService.put(`/blogs/${id}`, formData);
            
            console.log('Blog updated successfully:', response.data);
            return response.data;
            
        } catch (error) {
            console.error('Blog update error:', {
                id,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                message: error.message
            });
            
            const errorMessage = error.response?.data?.message 
                || error.response?.data?.error 
                || error.message 
                || 'Failed to update blog post';
                
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteBlogPost = createAsyncThunk(
    'blogs/delete',
    async (id, { rejectWithValue }) => {
        try {
            if (!id) {
                throw new Error('Blog ID is required for deletion');
            }
            
            await apiService.delete(`/blogs/${id}`);
            console.log('Blog deleted successfully:', id);
            return id;
            
        } catch (error) {
            console.error('Blog deletion error:', {
                id,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                message: error.message
            });
            
            const errorMessage = error.response?.data?.message 
                || error.response?.data?.error 
                || error.message 
                || 'Failed to delete blog post';
                
            return rejectWithValue(errorMessage);
        }
    }
);

const initialState = {
    blogs: [],
    currentBlog: null,
    isLoading: false,
    error: null,
    successMessage: null,
    hasLoaded: false,
    // Additional state for better UX
    isCreating: false,
    isUpdating: false,
    isDeleting: false
};

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setCurrentBlog: (state, action) => {
            state.currentBlog = action.payload;
            state.error = null;
        },
        clearCurrentBlog: (state) => {
            state.currentBlog = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
        resetBlogState: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create blog cases
            .addCase(createBlogPost.pending, (state) => {
                state.isLoading = true;
                state.isCreating = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(createBlogPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isCreating = false;
                state.blogs.unshift(action.payload);
                state.successMessage = 'Blog post created successfully';
                state.error = null;
            })
            .addCase(createBlogPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isCreating = false;
                state.error = action.payload || 'Failed to create blog post';
                state.successMessage = null;
            })
            
            // Get all blogs cases
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasLoaded = true;
                state.blogs = Array.isArray(action.payload) ? action.payload : [];
                state.error = null;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch blogs';
                state.blogs = [];
            })
            
            // Get draft blogs cases
            .addCase(getDraftBlogs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDraftBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = Array.isArray(action.payload) ? action.payload : [];
                state.error = null;
            })
            .addCase(getDraftBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch draft blogs';
                state.blogs = [];
            })
            
            // Update blog cases
            .addCase(updateBlogPost.pending, (state) => {
                state.isLoading = true;
                state.isUpdating = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateBlogPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isUpdating = false;
                const updatedBlog = action.payload;
                state.blogs = state.blogs.map(blog =>
                    blog._id === updatedBlog._id ? updatedBlog : blog
                );
                if (state.currentBlog && state.currentBlog._id === updatedBlog._id) {
                    state.currentBlog = updatedBlog;
                }
                state.successMessage = 'Blog post updated successfully';
                state.error = null;
            })
            .addCase(updateBlogPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isUpdating = false;
                state.error = action.payload || 'Failed to update blog post';
                state.successMessage = null;
            })
            
            // Delete blog cases
            .addCase(deleteBlogPost.pending, (state) => {
                state.isLoading = true;
                state.isDeleting = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteBlogPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isDeleting = false;
                const deletedId = action.payload;
                state.blogs = state.blogs.filter(blog => blog._id !== deletedId);
                if (state.currentBlog && state.currentBlog._id === deletedId) {
                    state.currentBlog = null;
                }
                state.successMessage = 'Blog post deleted successfully';
                state.error = null;
            })
            .addCase(deleteBlogPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isDeleting = false;
                state.error = action.payload || 'Failed to delete blog post';
                state.successMessage = null;
            });
    }
});

export const { 
    setCurrentBlog, 
    clearCurrentBlog, 
    clearError, 
    clearSuccessMessage, 
    resetBlogState 
} = blogSlice.actions;

export default blogSlice.reducer;