import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FileEdit, 
    Trash2, 
    Plus, 
    MoreVertical,
    Eye,
    Search,
    Filter 
} from 'lucide-react';
import { useBlog } from '../../hooks/useBlog';

const BlogList = () => {
    const navigate = useNavigate();
    const { blogs, isLoading, loadBlogs, deleteBlog, updateBlog, hasLoaded } = useBlog();
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef(null);
    const tableRef = useRef(null);
    
    // Cache the loadBlogs call
    const loadBlogsWithFilter = useCallback(() => {
        if (!hasLoaded || statusFilter !== 'all') {
            loadBlogs(statusFilter);
        }
    }, [loadBlogs, statusFilter, hasLoaded]);

    // Load blogs when component mounts or filter changes
    useEffect(() => {
        loadBlogsWithFilter();
    }, [loadBlogsWithFilter]);    // Apply search filter locally
    useEffect(() => {
        let result = [...blogs];
        
        if (searchTerm) {
            result = result.filter(blog => 
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.author?.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        setFilteredBlogs(result);
    }, [blogs, searchTerm]);    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            const success = await deleteBlog(id);
            if (success) {
                // Reload the current filter after deletion
                loadBlogs(statusFilter);
            }
        }
    }, [deleteBlog, loadBlogs, statusFilter]);

    const handleStatusChange = useCallback(async (id, currentStatus) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';
        const success = await updateBlog(id, { status: newStatus });
        if (success) {
            // Reload the current filter after status change
            loadBlogs(statusFilter);
        }
    }, [updateBlog, loadBlogs, statusFilter]);

    // Close dropdown when clicking outside or scrolling
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        }

        function handleScroll() {
            if (activeDropdown) {
                setActiveDropdown(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('scroll', handleScroll, true);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [activeDropdown]);

    // Function to handle dropdown toggle and positioning
    const handleDropdownToggle = (blogId, event) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (activeDropdown === blogId) {
            setActiveDropdown(null);
            return;
        }

        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const tableRect = tableRef.current?.getBoundingClientRect();
        
        let left = rect.right - 192; // 192px is the width of the dropdown (w-48)
        const top = rect.bottom + window.scrollY;

        // Ensure dropdown doesn't go outside the table on the right
        if (tableRect && left + 192 > tableRect.right) {
            left = rect.left - 192 + button.offsetWidth;
        }

        setDropdownPosition({ top, left });
        setActiveDropdown(blogId);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
                    <p className="text-gray-500 mt-1">Manage your blog content</p>
                </div>
                <button
                    onClick={() => navigate('/admin/blog/new')}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    New Post
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                        value={statusFilter}                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="min-w-full overflow-x-auto" ref={tableRef}>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBlogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{blog.author?.name || 'Unknown'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                            blog.status === 'published' 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="relative inline-block text-left">
                                            <button
                                                onClick={(e) => handleDropdownToggle(blog._id, e)}
                                                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                            {activeDropdown === blog._id && (
                                                <div 
                                                    ref={dropdownRef}
                                                    className="fixed w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 divide-y divide-gray-100"
                                                    style={{ 
                                                        top: `${dropdownPosition.top}px`, 
                                                        left: `${dropdownPosition.left}px` 
                                                    }}
                                                >
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => {
                                                                navigate(`/admin/blog/edit/${blog._id}`);
                                                                setActiveDropdown(null);
                                                            }}
                                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full transition-colors"
                                                        >
                                                            <FileEdit className="w-4 h-4 mr-2" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                handleStatusChange(blog._id, blog.status);
                                                                setActiveDropdown(null);
                                                            }}
                                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full transition-colors"
                                                        >
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                                                        </button>
                                                    </div>
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => {
                                                                handleDelete(blog._id);
                                                                setActiveDropdown(null);
                                                            }}
                                                            className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
