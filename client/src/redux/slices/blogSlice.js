import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/apiService';

export const createBlogPost = createAsyncThunk(
    'blogs/create',
    async (blogData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            Object.keys(blogData).forEach(key => {
                if (key === 'tags') {
                    formData.append(key, JSON.stringify(blogData[key]));
                } else {
                    formData.append(key, blogData[key]);
                }
            });
            
            const response = await apiService.post('/blogs', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAllBlogs = createAsyncThunk(
    'blogs/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/blogs');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateBlogPost = createAsyncThunk(
    'blogs/update',
    async ({ id, blogData }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            Object.keys(blogData).forEach(key => {
                if (key === 'tags') {
                    formData.append(key, JSON.stringify(blogData[key]));
                } else {
                    formData.append(key, blogData[key]);
                }
            });
            
            const response = await apiService.put(`/blogs/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteBlogPost = createAsyncThunk(
    'blogs/delete',
    async (id, { rejectWithValue }) => {
        try {
            await apiService.delete(`/blogs/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const initialState = {
    blogs: [],
    currentBlog: null,
    isLoading: false,
    error: null,
    successMessage: null
};

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setCurrentBlog: (state, action) => {
            state.currentBlog = action.payload;
        },
        clearCurrentBlog: (state) => {
            state.currentBlog = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create blog
            .addCase(createBlogPost.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createBlogPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs.unshift(action.payload);
                state.successMessage = 'Blog post created successfully';
            })
            .addCase(createBlogPost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get all blogs
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update blog
            .addCase(updateBlogPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBlogPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = state.blogs.map(blog =>
                    blog._id === action.payload._id ? action.payload : blog
                );
                state.successMessage = 'Blog post updated successfully';
            })
            .addCase(updateBlogPost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete blog
            .addCase(deleteBlogPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlogPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
                state.successMessage = 'Blog post deleted successfully';
            })
            .addCase(deleteBlogPost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { setCurrentBlog, clearCurrentBlog, clearError, clearSuccessMessage } = blogSlice.actions;
export default blogSlice.reducer;