import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, Clock } from 'lucide-react';
import apiService from '../redux/services/apiService';

const BlogDetails = () => {



    useEffect(() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }, []);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);  

  useEffect(() => {
    const fetchBlogBySlug = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the specific blog post by slug
        const response = await apiService.get(`/blogs/post/${slug}`);
        setBlog(response.data);
        
        // Fetch related blogs (optional - you can remove this if not needed)
        try {
          const relatedResponse = await apiService.get('/blogs?limit=3');
          const filteredRelated = relatedResponse.data
            .filter(relatedBlog => relatedBlog.slug !== slug)
            .slice(0, 3);
          setRelatedBlogs(filteredRelated);
        } catch (relatedError) {
          console.log('Could not fetch related blogs:', relatedError);
        }
        
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.response?.data?.message || 'Blog post not found');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchBlogBySlug();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ''); // Strip HTML tags
    const wordCount = textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: `Check out this blog post: ${blog.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => navigate('/blog')}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Featured Image */}
        {blog.featuredImage?.url && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-sm">
            <img
              src={blog.featuredImage.url}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        {/* Article Header */}
        <header className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags && blog.tags.length > 0 && blog.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            {blog.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>By {blog.author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{estimateReadingTime(blog.content)} min read</span>
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </header>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-teal-600 prose-strong:text-gray-900 prose-code:text-teal-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog._id}
                  to={`/blog/${relatedBlog.slug}`}
                  className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {relatedBlog.featuredImage?.url && (
                    <img
                      src={relatedBlog.featuredImage.url}
                      alt={relatedBlog.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {formatDate(relatedBlog.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default BlogDetails;
