import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
    createBlogPost,
    getAllBlogs,
    getDraftBlogs,
    updateBlogPost,
    deleteBlogPost,
    setCurrentBlog,
    clearCurrentBlog
} from '../redux/slices/blogSlice';

export const useBlog = () => {    const dispatch = useDispatch();
    const { blogs, currentBlog, isLoading, error, successMessage, hasLoaded } = useSelector((state) => state.blogs);    const handleCreateBlog = async (blogData) => {
        try {
            const result = await dispatch(createBlogPost(blogData)).unwrap();
            return { success: true, data: result };
        } catch (error) {
            console.error('Blog creation error:', error);
            throw error;
        }
    };

    const handleUpdateBlog = async (id, blogData) => {
        try {
            await dispatch(updateBlogPost({ id, blogData })).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleDeleteBlog = async (id) => {
        try {
            await dispatch(deleteBlogPost(id)).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    };    const loadBlogs = useCallback(async (status) => {
        try {
            if (status === 'draft') {
                await dispatch(getDraftBlogs()).unwrap();
            } else if (status === 'published') {
                await dispatch(getAllBlogs('published')).unwrap();
            } else {
                await dispatch(getAllBlogs()).unwrap();
            }
            return true;
        } catch (error) {
            console.error('Error loading blogs:', error);
            return false;
        }
    }, [dispatch]);

    const selectBlog = (blog) => {
        dispatch(setCurrentBlog(blog));
    };

    const clearBlog = () => {
        dispatch(clearCurrentBlog());
    };    return {
        blogs,
        currentBlog,
        isLoading,
        error,
        successMessage,
        hasLoaded,
        createBlog: handleCreateBlog,
        updateBlog: handleUpdateBlog,
        deleteBlog: handleDeleteBlog,
        loadBlogs,
        selectBlog,
        clearBlog
    };
};