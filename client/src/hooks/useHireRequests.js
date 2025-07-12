import { useState } from 'react';
import api from '../services/api';

const useHireRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHireRequest = async (requestData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/hire-requests', requestData);
      setIsLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to submit hire request';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const getAllHireRequests = async (page = 1, limit = 10, status = 'all') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get('/hire-requests', {
        params: { page, limit, status }
      });
      
      setIsLoading(false);
      return {
        requests: response.data.data,
        totalPages: response.data.pagination.totalPages,
        totalItems: response.data.pagination.totalItems
      };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch hire requests';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  const getHireRequestStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get('/hire-requests/stats');
      setIsLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch hire request stats';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  const updateHireRequestStatus = async (requestId, status) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.patch(`/hire-requests/${requestId}/status`, { status });
      setIsLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update hire request status';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return {
    submitHireRequest,
    getAllHireRequests,
    getHireRequestStats,
    updateHireRequestStatus,
    isLoading,
    error
  };
};

export default useHireRequests;
