import { useSelector, useDispatch } from 'react-redux';
import {
    submitStudentApplication,
    getAllStudentApplications,
    updateStudentApplicationStatus,
    deleteStudentApplication
} from '../redux/slices/studentSlice';
import { getApiErrorMessage } from '../utils/apiError';

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
            // error may be an axios error, a rejectWithValue string, or a plain Error
            throw new Error(getApiErrorMessage(error, 'Failed to submit application. Please try again later.'));
        }
    };

    const loadApplications = async (filters = {}) => {
        try {
            await dispatch(getAllStudentApplications(filters)).unwrap();
            return true;
        } catch {
            return false;
        }
    };

    const updateApplication = async (id, updateData) => {
        try {
            await dispatch(updateStudentApplicationStatus({ id, ...updateData })).unwrap();
            return true;
        } catch {
            return false;
        }
    };

    const deleteApplication = async (id) => {
        try {
            await dispatch(deleteStudentApplication(id)).unwrap();
            return true;
        } catch {
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