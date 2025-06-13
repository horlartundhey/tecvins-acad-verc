import { useSelector, useDispatch } from 'react-redux';
import { 
    submitPartnership, 
    getAllPartnerships, 
    updatePartnershipStatus,
    deletePartnership,
    exportPartnerships,
    clearMessages,
    setCurrentPartnership
} from '../redux/slices/partnerSlice';

export const usePartnership = () => {
    const dispatch = useDispatch();
    const { 
        partnerships, 
        currentPartnership,
        isLoading, 
        error, 
        successMessage,
        exportData 
    } = useSelector((state) => state.partners);

    const submitPartnershipForm = async (formData) => {
        try {
            const result = await dispatch(submitPartnership(formData)).unwrap();
            return result;
        } catch (error) {
            throw error;
        }
    };

    const getPartnerships = async (filters = {}) => {
        try {
            const result = await dispatch(getAllPartnerships(filters)).unwrap();
            return result.data;
        } catch (error) {
            throw error;
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const result = await dispatch(updatePartnershipStatus({ id, status })).unwrap();
            return result.data;
        } catch (error) {
            throw error;
        }
    };

    const deletePartnershipById = async (id) => {
        try {
            await dispatch(deletePartnership(id)).unwrap();
            return true;
        } catch (error) {
            throw error;
        }
    };

    const exportPartnershipData = async () => {
        try {
            const result = await dispatch(exportPartnerships()).unwrap();
            return result.data;
        } catch (error) {
            throw error;
        }
    };

    const clearPartnershipMessages = () => {
        dispatch(clearMessages());
    };

    const setCurrentPartnershipData = (partnership) => {
        dispatch(setCurrentPartnership(partnership));
    };

    return {
        partnerships,
        currentPartnership,
        isLoading,
        error,
        successMessage,
        exportData,
        submitPartnership: submitPartnershipForm,
        getPartnerships,
        updateStatus,
        deletePartnership: deletePartnershipById,
        exportPartnerships: exportPartnershipData,
        clearPartnershipMessages,
        setCurrentPartnership: setCurrentPartnershipData
    };
};