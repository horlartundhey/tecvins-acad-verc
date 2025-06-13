import React, { useState, useEffect } from 'react';
import { 
    FileText, 
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    Search,
    Filter,
    X,
    Download,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useTrainerApplications } from '../../hooks/useTrainerApplications';

const TrainerList = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [courseAreaFilter, setCourseAreaFilter] = useState('all');
    const [experienceFilter, setExperienceFilter] = useState('all');
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);    const [exportLoading, setExportLoading] = useState(false);

    const { applications, isLoading, error, loadApplications, updateApplication, deleteApplication } = useTrainerApplications();
    useEffect(() => {
        const loadData = async () => {
            await loadApplications();
        };
        loadData();
    }, [loadApplications]);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const handleExport = async () => {
        setExportLoading(true);
        try {
            const csvContent = [
                ['Full Name', 'Email', 'Phone', 'Country', 'Course Area', 'Experience', 'Teaching Experience', 'Status', 'Date'],
                ...filteredApplications.map(app => [
                    `${app.firstName} ${app.lastName}`,
                    app.email,
                    app.phoneNumber,
                    app.country,
                    app.courseArea,
                    app.experience,
                    app.teachingExp,
                    app.status,
                    new Date(app.createdAt).toLocaleDateString()
                ])
            ].map(row => row.join(',')).join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'trainer-applications.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } finally {
            setExportLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const lastPage = Math.ceil(filteredApplications.length / pageSize);
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, filteredApplications.length);
    const paginatedApplications = filteredApplications.slice(start, end);    useEffect(() => {
        let result = [...applications];

        // Apply filters
        if (searchTerm) {
            result = result.filter(app => 
                (app.firstName + ' ' + app.lastName)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (statusFilter !== 'all') {
            result = result.filter(app => app.status === statusFilter);
        }

        if (courseAreaFilter !== 'all') {
            result = result.filter(app => app.courseArea === courseAreaFilter);
        }

        if (experienceFilter !== 'all') {
            result = result.filter(app => app.experience === experienceFilter);
        }

        // Apply sorting
        result.sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];
            
            // Special handling for name sorting
            if (sortField === 'firstName') {
                aValue = (a.firstName + ' ' + a.lastName).toLowerCase();
                bValue = (b.firstName + ' ' + b.lastName).toLowerCase();
            }
            
            // Handle dates
            if (sortField === 'createdAt') {
                aValue = new Date(a.createdAt);
                bValue = new Date(b.createdAt);
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        
        setFilteredApplications(result);
    }, [applications, searchTerm, statusFilter, courseAreaFilter, experienceFilter, sortField, sortOrder]);

    const handleStatusChange = async (id, newStatus) => {
        await updateApplication(id, { status: newStatus });
        loadApplications();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            await deleteApplication(id);
            loadApplications();
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
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
    }    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Trainer Applications</h1>
                    <p className="text-gray-500 mt-1">Manage trainer applications</p>
                </div>
                <button
                    onClick={handleExport}
                    disabled={exportLoading || filteredApplications.length === 0}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                        (exportLoading || filteredApplications.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {exportLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    ) : (
                        <Download className="h-4 w-4 mr-2" />
                    )}
                    Export CSV
                </button>
            </div>

            {/* Filters and Search Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
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
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <div className="relative">
                    <select
                        value={courseAreaFilter}
                        onChange={(e) => setCourseAreaFilter(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                    >
                        <option value="all">All Course Areas</option>
                        <option value="product-management">Product Management</option>
                        <option value="product-design">Product Design</option>
                        <option value="development">Development</option>
                        <option value="job-readiness">Job Readiness</option>
                    </select>
                </div>
                <div className="relative">
                    <select
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                    >
                        <option value="all">All Experience Levels</option>
                        <option value="None">No Experience</option>
                        <option value="More than 6 months">6+ Months</option>
                        <option value="Between 4-12 months">4-12 Months</option>
                        <option value="2 - 18 months">2-18 Months</option>
                        <option value="18 - 24 months">18-24 Months</option>
                        <option value="More than 24 months">24+ Months</option>
                    </select>
                </div>
            </div>

            {/* Applications Table with Sorting */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="min-w-full overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('firstName')}
                                >
                                    <div className="flex items-center">
                                        Applicant
                                        {sortField === 'firstName' && (
                                            <ArrowUpDown className="h-4 w-4 ml-1" />
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('email')}
                                >
                                    <div className="flex items-center">
                                        Contact
                                        {sortField === 'email' && (
                                            <ArrowUpDown className="h-4 w-4 ml-1" />
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('courseArea')}
                                >
                                    <div className="flex items-center">
                                        Course Area
                                        {sortField === 'courseArea' && (
                                            <ArrowUpDown className="h-4 w-4 ml-1" />
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('experience')}
                                >
                                    <div className="flex items-center">
                                        Experience
                                        {sortField === 'experience' && (
                                            <ArrowUpDown className="h-4 w-4 ml-1" />
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Teaching
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('status')}
                                >
                                    <div className="flex items-center">
                                        Status
                                        {sortField === 'status' && (
                                            <ArrowUpDown className="h-4 w-4 ml-1" />
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('createdAt')}
                                >
                                    <div className="flex items-center">
                                        Date
                                        {sortField === 'createdAt' && (
                                            <ArrowUpDown className="h-4 w-4 ml-1" />
                                        )}
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedApplications.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{app.firstName} {app.lastName}</div>
                                            <div className="text-sm text-gray-500">{app.gender}</div>
                                            <div className="text-sm text-gray-500">{app.country}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm">{app.email}</div>
                                        <div className="text-sm text-gray-500">{app.phoneNumber}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${                                            app?.courseArea === 'product-management' 
                                                ? 'bg-purple-100 text-purple-800'
                                                : app?.courseArea === 'product-design'
                                                ? 'bg-blue-100 text-blue-800'
                                                : app?.courseArea === 'development'
                                                ? 'bg-teal-100 text-teal-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {app?.courseArea ? app.courseArea.split('-').map(word => 
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                            ).join(' ') : 'Not Specified'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{app.experience}</div>
                                        <div className="text-xs text-gray-500">Skill Level: {app.skillRating}/7</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {app.teachingExp === 'Yes' ? 'Has Experience' : 'No Experience'}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {app.confidence}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                            app.status === 'approved' 
                                                ? 'bg-green-100 text-green-800'
                                                : app.status === 'rejected'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedTrainer(app);
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

            {/* Pagination Controls */}
            <div className="flex items-center justify-between py-3">
                <div className="flex-1 flex justify-between sm:hidden">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{start + 1}</span> to{' '}
                            <span className="font-medium">{end}</span> of{' '}
                            <span className="font-medium">{filteredApplications.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            {/* Page Numbers */}
                            {[...Array(lastPage)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                        currentPage === i + 1
                                            ? 'z-10 bg-teal-50 border-teal-500 text-teal-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === lastPage}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Application Details Modal */}
            {showModal && selectedTrainer && (
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
                        <div className="space-y-6">
                            {/* Application Status */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Application Status</h4>
                                <div className="mt-2">
                                    <select
                                        value={selectedTrainer.status}
                                        onChange={(e) => handleStatusChange(selectedTrainer._id, e.target.value)}
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

export default TrainerList;
