import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    createCohort,
    getAllCohorts,
    updateCohort,
    deleteCohort,
    clearMessages,
    clearCache,
    toggleCohortActivation as toggleCohortActivationAction
} from '../redux/slices/cohortSlice';

export const useCohort = () => {
    const dispatch = useDispatch();
    const {
        cohorts,
        currentCohort,
        isLoading,
        error,
        successMessage
    } = useSelector((state) => state.cohorts);

    const submitCohort = useCallback(async (formData) => {
        try {
            const response = await dispatch(createCohort(formData)).unwrap();
            return response;
        } catch (error) {
            console.error('Error creating cohort:', error);
            throw error;
        }
    }, [dispatch]);    const getCohorts = useCallback(async (filters = {}) => {
        try {
            // Check cache for upcoming cohorts
            if (filters.status === 'upcoming' && 
                cohorts.cache?.upcoming?.data && 
                cohorts.cache?.upcoming?.timestamp) {
                // Cache is valid for 5 minutes
                const cacheAge = Date.now() - cohorts.cache.upcoming.timestamp;
                if (cacheAge < 5 * 60 * 1000) {
                    return cohorts.cache.upcoming.data;
                }
            }
            
            const response = await dispatch(getAllCohorts(filters)).unwrap();
            console.log('Raw API response:', response); // Debug log
            
            // Handle both possible response formats
            const cohortsData = response.data || response;
            const cohortArray = Array.isArray(cohortsData) ? cohortsData : [cohortsData];
            console.log('Processed cohorts:', cohortArray); // Debug log
            return cohortArray;
        } catch (error) {
            console.error('Error fetching cohorts:', error);
            return [];
        }
    }, [dispatch, cohorts.cache]);    const updateCohortData = useCallback(async (id, updateData) => {
        try {
            // Match the expected parameter structure of the updateCohort thunk
            const response = await dispatch(updateCohort({ 
                id, 
                updateData 
            })).unwrap();
            return response;
        } catch (error) {
            console.error('Error updating cohort:', error);
            throw error;
        }
    }, [dispatch]);

    const removeCohort = useCallback(async (id) => {
        try {
            await dispatch(deleteCohort(id)).unwrap();
        } catch (error) {
            console.error('Error deleting cohort:', error);
            throw error;
        }
    }, [dispatch]);

    const clearCohortCache = useCallback(() => {
        dispatch(clearCache());
    }, [dispatch]);

    const clearCohortMessages = useCallback(() => {
        dispatch(clearMessages());
    }, [dispatch]);    const toggleCohortActivation = useCallback(async (id, isActive) => {
        try {
            const response = await dispatch(toggleCohortActivationAction({ id, isActive })).unwrap();
            return response;
        } catch (error) {
            console.error('Error toggling cohort activation:', error);
            throw error;
        }
    }, [dispatch]);

    return {
        cohorts: cohorts.data,
        currentCohort,
        isLoading,
        error,
        successMessage,
        submitCohort,
        getCohorts,
        updateCohortData,
        removeCohort,
        clearCohortCache,
        clearCohortMessages,
        toggleCohortActivation
    };
};
