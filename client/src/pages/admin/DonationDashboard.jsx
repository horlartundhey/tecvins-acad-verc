import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, TrendingUp, Users, Calendar, Trash2, CheckCircle } from 'lucide-react';
import useDonation from '../../hooks/useDonation';

const DonationDashboard = () => {
  const { getAllDonations, getDonationStats, deleteDonation, markDonationCompleted, isProcessing, error } = useDonation();
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [totalPages, setTotalPages] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [completing, setCompleting] = useState(null);
  const [refreshTick, setRefreshTick] = useState(0);
  const [selected, setSelected] = useState([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [actionError, setActionError] = useState(null);

  // Keep stable refs to the hook functions so they don't trigger re-runs
  const getAllDonationsRef = useRef(getAllDonations);
  const getDonationStatsRef = useRef(getDonationStats);
  getAllDonationsRef.current = getAllDonations;
  getDonationStatsRef.current = getDonationStats;

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      setLoadError(null);
      try {
        const [donationsResult, statsResult] = await Promise.all([
          getAllDonationsRef.current(currentPage, 10, statusFilter),
          getDonationStatsRef.current()
        ]);
        if (cancelled) return;
        setDonations(donationsResult.donations || []);
        setTotalPages(donationsResult.totalPages || 1);
        setStats(statsResult);
        setSelected([]);
      } catch (err) {
        if (!cancelled) setLoadError(err?.message || 'Failed to load donation data');
      }
    };
    loadData();
    return () => { cancelled = true; };
  }, [currentPage, statusFilter, refreshTick]);

  const loadData = () => setRefreshTick(t => t + 1);

  // ── Selection helpers ──────────────────────────────────────────────────────
  const allSelected = donations.length > 0 && selected.length === donations.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = () => {
    setSelected(allSelected ? [] : donations.map(d => d._id));
  };

  const toggleOne = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // ── Bulk delete ────────────────────────────────────────────────────────────
  const handleBulkDelete = async () => {
    if (selected.length === 0) return;
    if (!window.confirm(`Delete ${selected.length} selected record(s)? This cannot be undone.`)) return;
    setBulkDeleting(true);
    setActionError(null);
    try {
      await Promise.all(selected.map(id => deleteDonation(id)));
      loadData();
    } catch (err) {
      setActionError(err?.message || 'Bulk delete failed');
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this donation record? This cannot be undone.')) return;
    setDeleting(id);
    setActionError(null);
    try {
      await deleteDonation(id);
      loadData();
    } catch (err) {
      setActionError(err?.message || 'Failed to delete donation');
    } finally {
      setDeleting(null);
    }
  };

  const handleMarkCompleted = async (id) => {
    if (!window.confirm('Mark this donation as completed? This will include it in the stats.')) return;
    setCompleting(id);
    setActionError(null);
    try {
      await markDonationCompleted(id);
      loadData();
    } catch (err) {
      setActionError(err?.message || 'Failed to mark donation as completed');
    } finally {
      setCompleting(null);
    }
  };

  const formatCurrency = (amount, currency) => {
    const symbols = { USD: '$', GBP: '£', NGN: '₦' };
    return `${symbols[currency] || currency} ${Number(amount).toLocaleString()}`;
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
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Donation Management</h1>
        <p className="text-gray-600">Track and manage donations to Tecvinson Academy</p>
      </div>

      {/* Load error banner */}
      {loadError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center justify-between">
          <p className="text-red-800 text-sm">Failed to load donations: {loadError}</p>
          <button onClick={loadData} className="ml-4 text-sm text-red-700 underline hover:text-red-900">Retry</button>
        </div>
      )}

      {/* Action error banner */}
      {actionError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center justify-between">
          <p className="text-red-800 text-sm">{actionError}</p>
          <button onClick={() => setActionError(null)} className="ml-4 text-sm text-red-700 underline hover:text-red-900">Dismiss</button>
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Raised - per-currency breakdown */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <p className="ml-4 text-sm font-medium text-gray-600">Total Raised</p>
            </div>
            {stats.byCurrency && stats.byCurrency.length > 0 ? (
              <div className="space-y-1">
                {stats.byCurrency.map(({ _id, total }) => (
                  <p key={_id} className="text-xl font-bold text-gray-900">
                    {formatCurrency(total, _id)}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-2xl font-bold text-gray-900">-</p>
            )}
            <p className="text-xs text-gray-400 mt-1">Completed only</p>
          </div>

          {/* Completed Donations count */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Donations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDonors || 0}</p>
              </div>
            </div>
          </div>

          {/* This Month */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Number(stats.monthlyAmount || 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">{stats.monthlyDonors || 0} donations</p>
              </div>
            </div>
          </div>

          {/* Average */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Donation</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Number(stats.averageDonation || 0).toFixed(0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {selected.length > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={bulkDeleting}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                {bulkDeleting ? 'Deleting...' : `Delete ${selected.length} selected`}
              </button>
            )}
          </div>

          <button
            onClick={loadData}
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
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={el => { if (el) el.indeterminate = someSelected; }}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.length > 0 ? (
                donations.map((donation) => (
                  <tr
                    key={donation._id}
                    className={`hover:bg-gray-50 ${selected.includes(donation._id) ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(donation._id)}
                        onChange={() => toggleOne(donation._id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                      />
                    </td>                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {donation.firstName} {donation.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{donation.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(donation.amount, donation.currency)}
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {donation.status !== 'completed' && (
                          <button
                            onClick={() => handleMarkCompleted(donation._id)}
                            disabled={completing === donation._id}
                            className="text-green-600 hover:text-green-800 disabled:opacity-40 transition-colors"
                            title="Mark as completed"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(donation._id)}
                          disabled={deleting === donation._id}
                          className="text-red-600 hover:text-red-800 disabled:opacity-40 transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
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
              <p className="text-sm text-gray-700">Page {currentPage} of {totalPages}</p>
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