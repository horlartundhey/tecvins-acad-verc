import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useStudentApplications } from '../../hooks/useStudentApplications';
import { useTrainerApplications } from '../../hooks/useTrainerApplications';
import { useBlog } from '../../hooks/useBlog';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { applications: studentApps, loadApplications: loadStudentApps } = useStudentApplications();
    const { applications: trainerApps, loadApplications: loadTrainerApps } = useTrainerApplications();
    const { blogs, loadBlogs } = useBlog();

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            navigate('/login');
            return;
        }

        loadStudentApps();
        loadTrainerApps();
        loadBlogs();
    }, [isAuthenticated, user]);

    const getStatusCount = (applications, status) => {
        return applications.filter(app => app.status === status).length;
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Student Applications Stats */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Student Applications</h2>
                    <div className="space-y-2">
                        <p>Total: {studentApps.length}</p>
                        <p>Pending: {getStatusCount(studentApps, 'pending')}</p>
                        <p>Approved: {getStatusCount(studentApps, 'approved')}</p>
                        <p>Rejected: {getStatusCount(studentApps, 'rejected')}</p>
                    </div>
                </div>

                {/* Trainer Applications Stats */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Trainer Applications</h2>
                    <div className="space-y-2">
                        <p>Total: {trainerApps.length}</p>
                        <p>Pending: {getStatusCount(trainerApps, 'pending')}</p>
                        <p>Approved: {getStatusCount(trainerApps, 'approved')}</p>
                        <p>Rejected: {getStatusCount(trainerApps, 'rejected')}</p>
                    </div>
                </div>

                {/* Blog Stats */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
                    <div className="space-y-2">
                        <p>Total Posts: {blogs.length}</p>
                        <p>Published: {blogs.filter(blog => blog.status === 'published').length}</p>
                        <p>Draft: {blogs.filter(blog => blog.status === 'draft').length}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Student Applications */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Recent Student Applications</h2>
                    <div className="space-y-4">
                        {studentApps.slice(0, 5).map(app => (
                            <div key={app._id} className="border-b pb-2">
                                <p className="font-medium">{app.fullName}</p>
                                <p className="text-sm text-gray-600">{app.course}</p>
                                <p className="text-sm text-gray-500">Status: {app.status}</p>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={() => navigate('/admin/students')}
                        className="mt-4 text-indigo-600 hover:text-indigo-800"
                    >
                        View all applications →
                    </button>
                </div>

                {/* Recent Trainer Applications */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Recent Trainer Applications</h2>
                    <div className="space-y-4">
                        {trainerApps.slice(0, 5).map(app => (
                            <div key={app._id} className="border-b pb-2">
                                <p className="font-medium">{app.fullName}</p>
                                <p className="text-sm text-gray-600">
                                    {app.expertise.join(', ')}
                                </p>
                                <p className="text-sm text-gray-500">Status: {app.status}</p>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={() => navigate('/admin/trainers')}
                        className="mt-4 text-indigo-600 hover:text-indigo-800"
                    >
                        View all applications →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;