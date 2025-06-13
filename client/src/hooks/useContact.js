import { useSelector, useDispatch } from 'react-redux';
import { submitContactForm, clearMessages } from '../redux/slices/contactSlice';

export const useContact = () => {
    const dispatch = useDispatch();
    const { isLoading, error, successMessage } = useSelector((state) => state.contact);    const submitContact = async (formData) => {
        try {
            const result = await dispatch(submitContactForm(formData)).unwrap();
            console.log('Response from server:', result);  // Debug log
            return result;
        } catch (error) {
            console.error('Contact submission error:', error);
            throw error;
        }
    };

    const clearContactMessages = () => {
        dispatch(clearMessages());
    };

    return {
        isLoading,
        error,
        successMessage,
        submitContact,
        clearContactMessages
    };
};