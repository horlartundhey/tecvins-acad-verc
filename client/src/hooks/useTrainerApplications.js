import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    submitTrainerApplication,
    getAllTrainerApplications,
    updateTrainerApplicationStatus
} from '../redux/slices/trainerSlice';

export const useTrainerApplications = () => {
    const dispatch = useDispatch();
    const { applications, isLoading, error, successMessage } = useSelector((state) => state.trainers);

    const handleSubmitApplication = async (applicationData) => {
        try {
            await dispatch(submitTrainerApplication(applicationData)).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    };    const loadApplications = React.useCallback(async (filters = {}) => {
        try {
            await dispatch(getAllTrainerApplications(filters)).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    }, [dispatch]);

    const updateStatus = async (id, status) => {
        try {
            await dispatch(updateTrainerApplicationStatus({ id, status })).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    };

    return {
        applications,
        isLoading,
        error,
        successMessage,
        submitApplication: handleSubmitApplication,
        loadApplications,
        updateStatus
    };
};