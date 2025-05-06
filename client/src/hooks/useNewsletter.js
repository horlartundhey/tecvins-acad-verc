import { useSelector, useDispatch } from 'react-redux';
import { subscribeToNewsletter, unsubscribeFromNewsletter, clearMessages } from '../redux/slices/newsletterSlice';

export const useNewsletter = () => {
    const dispatch = useDispatch();
    const { isLoading, error, successMessage } = useSelector((state) => state.newsletter);

    const subscribe = async (email) => {
        try {
            await dispatch(subscribeToNewsletter(email)).unwrap();
            return true;
        } catch {
            return false;
        }
    };

    const unsubscribe = async (email) => {
        try {
            await dispatch(unsubscribeFromNewsletter(email)).unwrap();
            return true;
        } catch {
            return false;
        }
    };

    const clearNewsletterMessages = () => {
        dispatch(clearMessages());
    };

    return {
        isLoading,
        error,
        successMessage,
        subscribe,
        unsubscribe,
        clearNewsletterMessages
    };
};