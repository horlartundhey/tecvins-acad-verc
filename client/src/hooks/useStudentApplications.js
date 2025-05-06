import { useSelector, useDispatch } from 'react-redux';
import {
    submitStudentApplication,
    getAllStudentApplications,
    updateStudentApplicationStatus
} from '../redux/slices/studentSlice';

export const useStudentApplications = () => {
    const dispatch = useDispatch();
    const { applications, isLoading, error, successMessage } = useSelector((state) => state.students);

    const handleSubmitApplication = async (applicationData) => {
        try {
            await dispatch(submitStudentApplication(applicationData)).unwrap();
            return true;
        } catch (error) {
            return false;
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

    const updateStatus = async (id, status) => {
        try {
            await dispatch(updateStudentApplicationStatus({ id, status })).unwrap();
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