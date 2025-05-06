import { useSelector, useDispatch } from 'react-redux';
import { submitPartnership, getAllPartnerships, clearMessages } from '../redux/slices/partnerSlice';

export const usePartnership = () => {
    const dispatch = useDispatch();
    const { partnerships, isLoading, error, successMessage } = useSelector((state) => state.partners);

    const submitPartnershipForm = async (formData) => {
        try {
            await dispatch(submitPartnership(formData)).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    };

    const getPartnerships = async (filters = {}) => {
        try {
            await dispatch(getAllPartnerships(filters)).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    };

    const clearPartnershipMessages = () => {
        dispatch(clearMessages());
    };

    return {
        partnerships,
        isLoading,
        error,
        successMessage,
        submitPartnership: submitPartnershipForm,
        getPartnerships,
        clearPartnershipMessages
    };
};