import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import { AlertCircle, ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Blog = () => {
  const { blogs, isLoading, error, loadBlogs } = useBlog();

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        <p className="mt-4 text-gray-600">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="mb-4 text-red-600 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
        <button 
          onClick={loadBlogs}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Blog Posts</h1>
      
      {blogs.length === 0 ? (
        <p className="text-gray-600">No blog posts available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article 
              key={blog._id} 
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >              {blog.featuredImage?.url && (
                <img 
                  src={blog.featuredImage.url}
                  alt={blog.title} 
                  className="w-full h-48 object-cover"
                />
              )}              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {blog.author && (
                    <span className="text-sm text-teal-600">By {blog.author.name}</span>
                  )}
                </div>
                
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 2 && (
                      <span className="text-xs text-gray-500">+{blog.tags.length - 2} more</span>
                    )}
                  </div>
                )}

                {/* Read More Button */}
                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors group"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;