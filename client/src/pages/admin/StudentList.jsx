import React, { useState, useEffect } from 'react';
import {
    FileText,
    Eye,
    Trash2,
    Search,
    Filter,
    X,
    ListPlus,
    Download
} from 'lucide-react';
import { useStudentApplications } from '../../hooks/useStudentApplications';
import WaitlistManager from '../../components/WaitlistManager';
import { formatStatusLabel, getStatusStyles } from '../../utils/studentStatus';

const StudentList = () => {
    const [activeTab, setActiveTab] = useState('applications'); // 'applications' or 'waitlist'
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [filteredApplications, setFilteredApplications] = useState([]);
    const { applications, isLoading, error, loadApplications, updateApplication, deleteApplication } = useStudentApplications();

    useEffect(() => {
        loadApplications();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let result = [...applications];
        
        if (searchTerm) {
            result = result.filter(app => 
                app.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.course?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (statusFilter !== 'all') {
            result = result.filter(app => app.status === statusFilter);
        }
        
        setFilteredApplications(result);
    }, [applications, searchTerm, statusFilter]);

    const handleStatusChange = async (id, newStatus) => {
        await updateApplication(id, { status: newStatus });
        loadApplications();
        // Keep modal in sync if it's open for this application
        if (selectedStudent?._id === id) {
            setSelectedStudent(prev => ({ ...prev, status: newStatus }));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            await deleteApplication(id);
            loadApplications();
        }
    };

    const handleExportApplications = () => {
        const rows = filteredApplications.map((app) => ({
            firstName: app.firstName || '',
            lastName: app.lastName || '',
            email: app.email || '',
            course: app.course || '',
            status: formatStatusLabel(app.status),
            createdAt: app.createdAt ? new Date(app.createdAt).toLocaleDateString() : ''
        }));

        const csvContent = [
            ['First Name', 'Last Name', 'Email', 'Course', 'Status', 'Date'],
            ...rows.map((row) => [row.firstName, row.lastName, row.email, row.course, row.status, row.createdAt])
        ]
            .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'student-applications.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-red-600 mb-4">{error}</div>
                <button 
                    onClick={() => loadApplications()}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                <p className="text-gray-500 mt-1">Manage student applications and waitlist</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex -mb-px space-x-8">
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`${
                            activeTab === 'applications'
                                ? 'border-teal-500 text-teal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        <FileText className="w-5 h-5 mr-2" />
                        Applications
                    </button>
                    <button
                        onClick={() => setActiveTab('waitlist')}
                        className={`${
                            activeTab === 'waitlist'
                                ? 'border-teal-500 text-teal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        <ListPlus className="w-5 h-5 mr-2" />
                        Waitlist
                    </button>
                </nav>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'applications' ? (
                <>
                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex-1 min-w-[260px] relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or course..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="accepted">Accepted</option>
                                <option value="enrolled">Enrolled</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={handleExportApplications}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            <Download className="h-4 w-4" />
                            Export CSV
                        </button>
                    </div>

                    {/* Applications Table */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="min-w-full overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredApplications.map((app) => (
                                        <tr key={app._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{app.firstName}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{app.lastName}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{app.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{app.course}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-5 ${getStatusStyles(app.status).badge}`}>
                                                    <span className={`h-2 w-2 rounded-full ${getStatusStyles(app.status).dot}`} />
                                                    {formatStatusLabel(app.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(app.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedStudent(app);
                                                            setShowModal(true);
                                                        }}
                                                        className="text-teal-600 hover:text-teal-900"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(app._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <WaitlistManager />
            )}

            {/* Application Details Modal */}
            {showModal && selectedStudent && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Application Details</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Personal Information</h4>
                                <div className="mt-2 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">First Name</p>
                                        <p className="font-medium">{selectedStudent.firstName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Last Name</p>
                                        <p className="font-medium">{selectedStudent.lastName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium">{selectedStudent.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Phone Number</p>
                                        <p className="font-medium">{selectedStudent.phoneNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Course</p>
                                        <p className="font-medium">{selectedStudent.course}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Country</p>
                                        <p className="font-medium">{selectedStudent.country}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Time Zone</p>
                                        <p className="font-medium">{selectedStudent.timeZone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Reason</p>
                                        <p className="font-medium">{selectedStudent.reason}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Application Status</h4>
                                <div className="mt-2">
                                    <select
                                        value={selectedStudent.status}
                                        onChange={(e) => handleStatusChange(selectedStudent._id, e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentList;
