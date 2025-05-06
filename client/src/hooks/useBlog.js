import { useSelector, useDispatch } from 'react-redux';
import {
    createBlogPost,
    getAllBlogs,
    updateBlogPost,
    deleteBlogPost,
    setCurrentBlog,
    clearCurrentBlog
} from '../redux/slices/blogSlice';

export const useBlog = () => {
    const dispatch = useDispatch();
    const { blogs, currentBlog, isLoading, error, successMessage } = useSelector((state) => state.blogs);

    const handleCreateBlog = async (blogData) => {
        try {
            await dispatch(createBlogPost(blogData)).unwrap();
            return true;
        } catch (error) {
            return false;
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
    };

    const loadBlogs = async () => {
        try {
            await dispatch(getAllBlogs()).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    };

    const selectBlog = (blog) => {
        dispatch(setCurrentBlog(blog));
    };

    const clearBlog = () => {
        dispatch(clearCurrentBlog());
    };

    return {
        blogs,
        currentBlog,
        isLoading,
        error,
        successMessage,
        createBlog: handleCreateBlog,
        updateBlog: handleUpdateBlog,
        deleteBlog: handleDeleteBlog,
        loadBlogs,
        selectBlog,
        clearBlog
    };
};