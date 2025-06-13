import { useState } from 'react';
import { useApi } from './useApi';

export const usePartnerApplications = () => {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const api = useApi();

    const loadApplications = async (filters = {}) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get('/partners', { params: filters });
            if (response.data.success) {
                setApplications(response.data.data);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load applications');
        } finally {
            setIsLoading(false);
        }
    };

    const submitApplication = async (formData) => {
        setError(null);
        try {
            const response = await api.post('/partners', formData);
            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to submit application');
        }
    };

    const updateApplication = async (id, status) => {
        setError(null);
        try {
            const response = await api.put(`/partners/${id}`, status);
            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to update application');
        }
    };

    const deleteApplication = async (id) => {
        setError(null);
        try {
            const response = await api.delete(`/partners/${id}`);
            if (response.data.success) {
                return true;
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to delete application');
        }
    };

    const exportApplications = async () => {
        setError(null);
        try {
            const response = await api.get('/partners/export');
            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to export applications');
        }
    };

    return {
        applications,
        isLoading,
        error,
        loadApplications,
        submitApplication,
        updateApplication,
        deleteApplication,
        exportApplications
    };
};
