import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase as BriefcaseIcon, 
  Clock as ClockIcon, 
  Users as UsersIcon, 
  CheckCircle as CheckCircleIcon,
  X as XCircle,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import useHireRequests from '../../hooks/useHireRequests.js';

const HireRequestDashboard = () => {
  const { getAllHireRequests, getHireRequestStats, updateHireRequestStatus, isLoading } = useHireRequests();
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const hasInitialized = useRef(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    requestType: '',
    search: ''
  });

  useEffect(() => {
    // Prevent duplicate calls
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const loadData = async () => {
      try {
        const [requestsResult, statsResult] = await Promise.all([
          getAllHireRequests(currentPage, 10, filters.status),
          getHireRequestStats()
        ]);
        
        setRequests(requestsResult.requests || []);
        setTotalPages(requestsResult.totalPages || 1);
        setStats(statsResult);
      } catch (err) {
        console.error('Failed to load data:', err);
        // Set placeholder data on error
        setRequests([]);
        setStats({
          totalRequests: 0,
          quickRequests: 0,
          detailedRequests: 0,
          pendingRequests: 0
        });
      }
    };

    loadData();
  }, [currentPage, filters.status, getAllHireRequests, getHireRequestStats]);

  const loadRequests = async () => {
    try {
      const result = await getAllHireRequests(currentPage, 10, filters.status);
      setRequests(result.requests || []);
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      console.error('Failed to load hire requests:', err);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleUpdateStatus = async (request) => {
    try {
      // Open modal for status update
      setSelectedRequest(request);
      setShowModal(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await updateHireRequestStatus(requestId, newStatus);
      await loadRequests(); // Reload data after update
      setShowModal(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-gray-100 text-gray-800',
      rejected: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || statusClasses.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error loading hire requests: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hire Request Management</h1>
        <p className="text-gray-600">Track and manage talent hire requests</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BriefcaseIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalRequests || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Quick Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.quickRequests || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UsersIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Detailed Requests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.detailedRequests || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingRequests || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-4">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <button
            onClick={loadRequests}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Hire Requests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.length > 0 ? (
                requests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.companyName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.isQuickRequest ? 'Quick' : 'Detailed'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.email}</div>
                      <div className="text-sm text-gray-500">{request.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(request.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(request)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No hire requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    First
                  </button>
                  <button
                    onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Last
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Company Information</h4>
                <p><strong>Company:</strong> {selectedRequest.companyName}</p>
                <p><strong>Contact:</strong> {selectedRequest.contactName}</p>
                <p><strong>Email:</strong> {selectedRequest.email}</p>
                <p><strong>Phone:</strong> {selectedRequest.phone}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Request Details</h4>
                <p><strong>Type:</strong> {selectedRequest.isQuickRequest ? 'Quick' : 'Detailed'}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedRequest.status)}</p>
                <p><strong>Submitted:</strong> {formatDate(selectedRequest.createdAt)}</p>
              </div>
            </div>

            {selectedRequest.description && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{selectedRequest.description}</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t flex justify-between items-center">
              <select
                value={selectedRequest.status}
                onChange={(e) => handleStatusUpdate(selectedRequest._id, e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HireRequestDashboard;
