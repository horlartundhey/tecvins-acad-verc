import { useSelector, useDispatch } from 'react-redux';
import { submitContactForm, clearMessages } from '../redux/slices/contactSlice';

export const useContact = () => {
    const dispatch = useDispatch();
    const { isLoading, error, successMessage } = useSelector((state) => state.contact);

    const submitContact = async (formData) => {
        try {
            await dispatch(submitContactForm(formData)).unwrap();
            return true;
        } catch (error) {
            return false;
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