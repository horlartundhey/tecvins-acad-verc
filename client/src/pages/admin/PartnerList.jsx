import React, { useState, useEffect } from 'react';
import { 
    FileText, 
    Eye,
    Trash2,
    Search,
    Filter,
    X,
    Download,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { usePartnership } from '../../hooks/usePartnership';
import { toast } from 'react-toastify';

const PartnerList = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [filteredPartnerships, setFilteredPartnerships] = useState([]);
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [exportLoading, setExportLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    const { 
        partnerships,
        isLoading,
        error,
        successMessage,
        getPartnerships,
        updateStatus: updatePartnershipStatus,
        deletePartnership,
        exportPartnerships,
        clearPartnershipMessages
    } = usePartnership();

    useEffect(() => {
        let mounted = true;
        const loadData = async () => {
            try {
                if (mounted) {
                    await getPartnerships();
                    setLoadError(null);
                }
            } catch (err) {
                if (mounted) {
                    if (err.response?.status === 401) {
                        setLoadError('Please log in to access this page');
                    } else {
                        setLoadError(err.message || 'Failed to load partnerships');
                        toast.error(err.message || 'Failed to load partnerships');
                    }
                }
            }
        };
        loadData();
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            clearPartnershipMessages();
        }
        if (error) {
            toast.error(error);
            clearPartnershipMessages();
        }
    }, [successMessage, error, clearPartnershipMessages]);

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
            const data = await exportPartnerships();
            if (data) {
                // Create CSV headers
                const csvContent = [
                    ['Type', 'First Name', 'Last Name', 'Email', 'Phone', 'Contact Methods', 'Company Name', 'Note', 'Status', 'Date'],
                    ...data.map(partner => [
                        partner.type,
                        partner.firstName,
                        partner.lastName,
                        partner.email,
                        partner.phoneNumber || 'N/A',
                        partner.contactMethod?.join('; ') || 'N/A',
                        partner.companyName || 'N/A',
                        partner.note || 'N/A',
                        partner.status,
                        new Date(partner.createdAt).toLocaleString()
                    ])
                ].map(row => row.join(',')).join('\n');

                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', 'partner-applications.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            toast.error(error.message || 'Failed to export partnerships');
        } finally {
            setExportLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updatePartnershipStatus(id, newStatus);
            toast.success('Status updated successfully');
        } catch (err) {
            toast.error(err.message || 'Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await deletePartnership(id);
                toast.success('Partnership deleted successfully');
            } catch (err) {
                toast.error(err.message || 'Failed to delete partnership');
            }
        }
    };

    useEffect(() => {
        let result = [...partnerships];

        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(partner => {
                const fullName = `${partner.firstName} ${partner.lastName}`.toLowerCase();
                const email = partner.email.toLowerCase();
                const company = partner.companyName?.toLowerCase() || '';
                return fullName.includes(searchLower) || 
                       email.includes(searchLower) || 
                       company.includes(searchLower);
            });
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            result = result.filter(partner => partner.status === statusFilter);
        }

        // Apply type filter
        if (typeFilter !== 'all') {
            result = result.filter(partner => partner.type === typeFilter);
        }

        // Apply sorting
        result.sort((a, b) => {
            let aValue, bValue;

            switch (sortField) {
                case 'name':
                    aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
                    bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
                    break;
                case 'type':
                    aValue = a.type;
                    bValue = b.type;
                    break;
                case 'status':
                    aValue = a.status;
                    bValue = b.status;
                    break;
                case 'createdAt':
                    aValue = new Date(a.createdAt);
                    bValue = new Date(b.createdAt);
                    break;
                default:
                    aValue = a[sortField];
                    bValue = b[sortField];
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        
        setFilteredPartnerships(result);
    }, [partnerships, searchTerm, statusFilter, typeFilter, sortField, sortOrder]);

    const lastPage = Math.ceil(filteredPartnerships.length / pageSize);
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, filteredPartnerships.length);
    const paginatedPartnerships = filteredPartnerships.slice(start, end);    if (loadError) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{loadError}</p>
                    {loadError === 'Please log in to access this page' && (
                        <a href="/login" className="text-teal-600 hover:text-teal-700">
                            Go to Login
                        </a>
                    )}
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Partner Applications</h1>
                    <p className="text-gray-500 mt-1">Manage partnership applications</p>
                </div>
                <button
                    onClick={handleExport}
                    disabled={exportLoading || filteredPartnerships.length === 0}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500${
                        (exportLoading || filteredPartnerships.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or company..."
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
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                    >
                        <option value="all">All Types</option>
                        <option value="individual">Individual</option>
                        <option value="corporate">Corporate</option>
                    </select>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="min-w-full overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className="flex items-center">
                                        Name
                                        {sortField === 'name' && (
                                            <ArrowUpDown className="h-4 w-4 ml-1" />
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('type')}
                                >
                                    <div className="flex items-center">
                                        Type
                                        {sortField === 'type' && (
                                            <ArrowUpDown className="h-4 w-4 ml-1" />
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Contact
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
                            {paginatedPartnerships.map((partner) => (
                                <tr key={partner._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {partner.firstName} {partner.lastName}
                                            </div>
                                            {partner.companyName && (
                                                <div className="text-sm text-gray-500">{partner.companyName}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                            partner.type === 'individual'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-purple-100 text-purple-800'
                                        }`}>
                                            {partner.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{partner.email}</div>
                                        {partner.phoneNumber && (
                                            <div className="text-sm text-gray-500">{partner.phoneNumber}</div>
                                        )}
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {partner.contactMethod?.map((method, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800"
                                                >
                                                    {method}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={partner.status}
                                            onChange={(e) => handleStatusChange(partner._id, e.target.value)}
                                            className={`rounded-full px-2 text-xs font-semibold leading-5 ${
                                                partner.status === 'approved'
                                                    ? 'bg-green-100 text-green-800'
                                                    : partner.status === 'rejected'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(partner.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedPartner(partner);
                                                    setShowModal(true);
                                                }}
                                                className="text-teal-600 hover:text-teal-900"
                                                title="View Details"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(partner._id)}
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
                    {paginatedPartnerships.length === 0 && (
                        <div className="p-8 text-center text-gray-500">No applications found.</div>
                    )}                </div>
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
                            <span className="font-medium">{filteredPartnerships.length}</span> results
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

            {/* Partner Details Modal */}
            {showModal && selectedPartner && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Partnership Application Details</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Partner Type</h4>
                                    <p className="mt-1 text-sm text-gray-900 capitalize">{selectedPartner.type}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {selectedPartner.firstName} {selectedPartner.lastName}
                                    </p>
                                </div>
                            </div>

                            {/* Company Information */}
                            {selectedPartner.companyName && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Company Name</h4>
                                    <p className="mt-1 text-sm text-gray-900">{selectedPartner.companyName}</p>
                                </div>
                            )}

                            {/* Contact Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                                    <p className="mt-1 text-sm text-gray-900">{selectedPartner.email}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                                    <p className="mt-1 text-sm text-gray-900">{selectedPartner.phoneNumber || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Contact Methods */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Preferred Contact Methods</h4>
                                <div className="mt-2">
                                    {selectedPartner.contactMethod?.map((method, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2 mb-2 capitalize"
                                        >
                                            {method}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Note */}
                            {selectedPartner.note && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Additional Note</h4>
                                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{selectedPartner.note}</p>
                                </div>
                            )}

                            {/* Status Section */}
                            <div className="border-t pt-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Application Status</h4>
                                    <div className="mt-2">
                                        <select
                                            value={selectedPartner.status}
                                            onChange={(e) => handleStatusChange(selectedPartner._id, e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">
                                    <p>Application submitted on {new Date(selectedPartner.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerList;