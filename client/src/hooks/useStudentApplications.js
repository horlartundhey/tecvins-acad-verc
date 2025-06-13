import { useSelector, useDispatch } from 'react-redux';
import {
    submitStudentApplication,
    getAllStudentApplications,
    updateStudentApplicationStatus,
    deleteStudentApplication
} from '../redux/slices/studentSlice';

export const useStudentApplications = () => {
    const dispatch = useDispatch();
    const { applications, isLoading, error, successMessage } = useSelector((state) => state.students);    const handleSubmitApplication = async (applicationData) => {
        try {
            // First try to unwrap the result
            const result = await dispatch(submitStudentApplication(applicationData)).unwrap();
            
            if (!result) {
                throw new Error('Failed to submit application');
            }
            
            return result;
        } catch (error) {
            // Handle different error formats
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            
            if (error.message && error.message !== 'Failed to submit application') {
                throw new Error(error.message);
            }
            
            // Default error message
            throw new Error('Failed to submit application. Please try again later.');
        }
    };

    const loadApplications = async (filters = {}) => {
        try {
            await dispatch(getAllStudentApplications(filters)).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    };

    const updateApplication = async (id, updateData) => {
        try {
            await dispatch(updateStudentApplicationStatus({ id, ...updateData })).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    };

    const deleteApplication = async (id) => {
        try {
            await dispatch(deleteStudentApplication(id)).unwrap();
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
        updateApplication,
        deleteApplication
    };
};