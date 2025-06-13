import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Upload, Loader2, X } from 'lucide-react';
import { useBlog } from '../../hooks/useBlog';
import { Editor } from '@tinymce/tinymce-react';

const BlogForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { createBlog, updateBlog, blogs, loadBlogs } = useBlog();
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
        status: 'draft'
    });

    useEffect(() => {
        if (id) {
            const blog = blogs.find(b => b._id === id);
            if (blog) {
                setFormData({
                    title: blog.title || '',
                    content: blog.content || '',
                    tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
                    status: blog.status || 'draft'
                });
                if (blog.featuredImage) {
                    setImagePreview(blog.featuredImage);
                }
            }
        }
    }, [id, blogs]);

    useEffect(() => {
        if (!blogs.length) {
            loadBlogs();
        }
    }, [blogs.length, loadBlogs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditorChange = (content) => {
        setFormData(prev => ({
            ...prev,
            content: content || ''
        }));
    };    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('File selected:', file);
        
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
                e.target.value = '';
                setSelectedFile(null);
                return;
            }

            // Validate file size (10MB limit)
            const maxSize = 10 * 1024 * 1024; // 10MB in bytes
            if (file.size > maxSize) {
                alert('File size must be less than 10MB');
                e.target.value = '';
                return;
            }

            setSelectedFile(file);
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const removeImage = () => {
        setSelectedFile(null);
        setImagePreview(null);
        // Reset file input
        const fileInput = document.getElementById('file-upload');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const validateForm = () => {
        const errors = [];
        
        if (!formData.title?.trim()) {
            errors.push('Title is required');
        }
        
        if (!formData.content?.trim() || formData.content.trim() === '<p></p>') {
            errors.push('Content is required');
        }
        
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return false;
        }
        
        return true;
    };    const buildFormData = () => {
        const fd = new FormData();
        
        // Add text fields
        fd.append('title', formData.title.trim());
        fd.append('content', formData.content.trim());
        fd.append('status', formData.status || 'draft');
        
        // Process tags
        const tags = formData.tags 
            ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) 
            : [];
        fd.append('tags', JSON.stringify(tags));
        
        // Add file if selected
        if (selectedFile instanceof File) {
            console.log('Appending file:', selectedFile.name, 'type:', selectedFile.type, 'size:', selectedFile.size);
            fd.append('featuredImage', selectedFile);
        } else {
            console.log('No file selected or invalid file object');
        }
        
        return fd;
    };    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm() || isLoading) {
            return;
        }

        try {
            setIsLoading(true);
            
            // Build form data
            const fd = buildFormData();
            
            // Debug log
            console.log('Selected file:', selectedFile);
            console.log('Is file a File object?', selectedFile instanceof File);
            
            // Log form data entries
            for (let [key, value] of fd.entries()) {
                console.log('FormData entry:', key, value instanceof File ? `File: ${value.name}` : value);
            }
            
            // Submit
            if (id) {
                await updateBlog(id, fd);
            } else {
                await createBlog(fd);
            }
            
            navigate('/admin/blog');
        } catch (error) {
            console.error('Error submitting blog:', error);
            alert('Failed to save blog post. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/blog')}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {id ? 'Edit Blog Post' : 'Create New Blog Post'}
                        </h1>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-teal-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                placeholder="Enter blog title"
                                maxLength={200}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.title.length}/200 characters
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <Editor
                                    value={formData.content}
                                    onEditorChange={handleEditorChange}
                                    init={{
                                        height: 400,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; line-height: 1.6; }',
                                        branding: false,
                                        promotion: false,
                                        statusbar: true,
                                        resize: true,
                                        paste_data_images: true,
                                        automatic_uploads: false
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Enter tags separated by commas"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Separate multiple tags with commas
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Featured Image
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                                {imagePreview ? (
                                    <div className="space-y-2 text-center">
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="mx-auto h-32 w-full object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <label
                                            htmlFor="file-upload"
                                            className="cursor-pointer inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 transition-colors"
                                        >
                                            Change image
                                            <input
                                                id="file-upload"
                                                name="featuredImage"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="sr-only"
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <div className="space-y-2 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="featuredImage"
                                                    type="file"
                                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                                    onChange={handleImageChange}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF, WebP up to 10MB
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;