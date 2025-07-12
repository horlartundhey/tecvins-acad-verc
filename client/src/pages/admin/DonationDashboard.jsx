import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';
import useDonation from '../../hooks/useDonation';

const DonationDashboard = () => {
  const { getAllDonations, getDonationStats, isProcessing, error } = useDonation();
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [totalPages, setTotalPages] = useState(1);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Prevent duplicate calls
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const loadData = async () => {
      try {
        const [donationsResult, statsResult] = await Promise.all([
          getAllDonations(currentPage, 10, statusFilter),
          getDonationStats()
        ]);
        
        setDonations(donationsResult.donations || []);
        setTotalPages(donationsResult.totalPages || 1);
        setStats(statsResult);
      } catch (err) {
        console.error('Failed to load data:', err);
        // Set placeholder data on error
        setDonations([]);
        setStats({
          totalDonations: 0,
          totalAmount: 0,
          averageDonation: 0,
          monthlyGrowth: 0
        });
      }
    };

    loadData();
  }, [currentPage, statusFilter, getAllDonations, getDonationStats]);

  const loadDonations = async () => {
    try {
      const result = await getAllDonations(currentPage, 10, statusFilter);
      setDonations(result.donations || []);
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      console.error('Failed to load donations:', err);
    }
  };

  const formatCurrency = (amount, currency) => {
    const symbols = { USD: '$', GBP: '£', NGN: '₦' };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
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
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
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
        <p className="text-red-800">Error loading donations: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Donation Management</h1>
        <p className="text-gray-600">Track and manage donations to Tecvinson Academy</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Raised</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.totalAmount?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Donors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDonors || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.monthlyAmount?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.averageDonation?.toFixed(0) || '0'}
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <button
            onClick={loadDonations}
            disabled={isProcessing}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isProcessing ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Processor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.length > 0 ? (
                donations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {donation.firstName} {donation.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{donation.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(donation.amount, donation.currency)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(donation.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donation.paymentProcessor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(donation.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {donation.message || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    {isProcessing ? 'Loading donations...' : 'No donations found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationDashboard;
