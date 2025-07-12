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

  return {
    submitHireRequest,
    getAllHireRequests,
    getHireRequestStats,
    isLoading,
    error
  };
};

export default useHireRequest;

const useHireRequest = () => {
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

  return {
    submitHireRequest,
    getAllHireRequests,
    getHireRequestStats,
    isLoading,
    error
  };
};

export default useHireRequest;
};

export default useHireRequest;

  const getHireRequestStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/hire-requests/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch hire request stats');
      }

      setIsLoading(false);
      return { success: true, data: data.data };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  const updateHireRequestStatus = async (id, status) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/hire-requests/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update hire request status');
      }

      setIsLoading(false);
      return { success: true, data: data.data };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
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

export default useHireRequest;
