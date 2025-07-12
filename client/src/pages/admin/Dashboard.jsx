import React, { useEffect, useRef } from 'react';
import { 
    Users,
    GraduationCap,
    UserCog,
    MessageSquare,
    Handshake,
    FileEdit,
    AlertCircle,
    Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDashboard } from '../../hooks/useDashboard';
import ContactMessages from './ContactMessages';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { stats, recentActivities, isLoading, error, loadDashboardStats } = useDashboard();
    const hasInitialized = useRef(false);
    
    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            navigate('/login');
        }
    }, [isAuthenticated, user, navigate]);

    // Load dashboard data when authenticated - prevent double calls
    useEffect(() => {
        // Only load stats if we're authenticated and haven't loaded yet and haven't already initialized
        if (isAuthenticated && user?.role === 'admin' && !hasInitialized.current) {
            hasInitialized.current = true;
            loadDashboardStats();
        }
    }, [isAuthenticated, user, loadDashboardStats]);

    const statCards = [
        {
            title: 'Total Students',
            value: stats?.students?.total || 0,
            pending: stats?.students?.pending || 0,
            icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
            color: 'bg-blue-50',
            link: '/admin/students'
        },
        {
            title: 'Total Trainers',
            value: stats?.trainers?.total || 0,
            pending: stats?.trainers?.pending || 0,
            icon: <UserCog className="w-8 h-8 text-purple-600" />,
            color: 'bg-purple-50',
            link: '/admin/trainers'
        },
        {
            title: 'Blog Posts',
            value: stats?.blogs?.total || 0,
            published: stats?.blogs?.published || 0,
            icon: <FileEdit className="w-8 h-8 text-green-600" />,
            color: 'bg-green-50',
            link: '/admin/blog'
        },
        {
            title: 'Contact Messages',
            value: stats?.contacts?.total || 0,
            pending: stats?.contacts?.pending || 0,
            icon: <MessageSquare className="w-8 h-8 text-yellow-600" />,
            color: 'bg-yellow-50',
            link: '/admin/contact'
        },
        {
            title: 'Partners',
            value: stats?.partners?.total || 0,
            pending: stats?.partners?.pending || 0,
            icon: <Handshake className="w-8 h-8 text-red-600" />,
            color: 'bg-red-50',
            link: '/admin/partnerships'
        },
        {
            title: 'Hire Requests',
            value: stats?.hireRequests?.total || 0,
            pending: stats?.hireRequests?.pending || 0,
            icon: <Briefcase className="w-8 h-8 text-orange-600" />,
            color: 'bg-orange-50',
            link: '/admin/hire-requests'
        },
        {
            title: 'Total Users',
            value: stats?.users?.total || 0,
            admins: stats?.users?.admins || 0,
            editors: stats?.users?.editors || 0,
            icon: <Users className="w-8 h-8 text-indigo-600" />,
            color: 'bg-indigo-50',
            link: '/admin/users'
        }
    ];

    if (isLoading && !stats.students.total) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                <p className="mt-4 text-gray-600">Loading dashboard data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="mb-4 text-red-600 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {error}
                </div>
                <button 
                    onClick={loadDashboardStats}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome to your admin dashboard</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                    <div 
                        key={index}
                        className={`${stat.color} rounded-lg p-6 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer`}
                        onClick={() => navigate(stat.link)}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                {stat.pending !== undefined && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        {stat.pending} pending
                                    </p>
                                )}
                                {stat.published !== undefined && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        {stat.published} published
                                    </p>
                                )}
                                {stat.admins !== undefined && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        {stat.admins} admins, {stat.editors} editors
                                    </p>
                                )}
                            </div>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Student Applications */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Student Applications</h2>
                    {recentActivities.students?.length > 0 ? (
                        <div className="space-y-4">
                            {recentActivities.students.map((student) => (
                                <div key={student._id} className="border-b pb-2">
                                    <p className="font-medium text-gray-900">
                                        {student.firstName} {student.lastName}
                                    </p>
                                    <p className="text-sm text-gray-500">{student.course}</p>
                                    <p className="text-xs text-gray-400 mt-1">Status: {student.status}</p>
                                </div>
                            ))}
                            <button 
                                onClick={() => navigate('/admin/students')}
                                className="mt-4 text-teal-600 hover:text-teal-800 text-sm font-medium"
                            >
                                View all applications →
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-500">No recent student applications</p>
                    )}
                </div>

                {/* Recent Trainer Applications */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Trainer Applications</h2>
                    {recentActivities.trainers?.length > 0 ? (
                        <div className="space-y-4">
                            {recentActivities.trainers.map((trainer) => (
                                <div key={trainer._id} className="border-b pb-2">
                                    <p className="font-medium text-gray-900">{trainer.fullName}</p>
                                    <p className="text-sm text-gray-500">{trainer.expertise?.join(', ')}</p>
                                    <p className="text-xs text-gray-400 mt-1">Status: {trainer.status}</p>
                                </div>
                            ))}
                            <button 
                                onClick={() => navigate('/admin/trainers')}
                                className="mt-4 text-teal-600 hover:text-teal-800 text-sm font-medium"
                            >
                                View all applications →
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-500">No recent trainer applications</p>
                    )}
                </div>

                {/* Recent Blog Posts */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Blog Posts</h2>
                    {recentActivities.blogs?.length > 0 ? (
                        <div className="space-y-4">
                            {recentActivities.blogs.map((blog) => (
                                <div key={blog._id} className="border-b pb-2">
                                    <p className="font-medium text-gray-900">{blog.title}</p>
                                    <p className="text-xs text-gray-400 mt-1">Status: {blog.status}</p>
                                </div>
                            ))}
                            <button 
                                onClick={() => navigate('/admin/blog')}
                                className="mt-4 text-teal-600 hover:text-teal-800 text-sm font-medium"
                            >
                                View all posts →
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-500">No recent blog posts</p>
                    )}
                </div>
            </div>

            {/* Contact Messages Table */}
            <ContactMessages />
        </div>
    );
};

export default Dashboard;