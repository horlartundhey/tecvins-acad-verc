import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { subscribeToNewsletter, unsubscribeFromNewsletter, clearMessages } from '../redux/slices/newsletterSlice';

export const useNewsletter = () => {
    const dispatch = useDispatch();
    const { isLoading, error, successMessage } = useSelector((state) => state.newsletter);

    const subscribe = useCallback(async (email) => {
        try {
            await dispatch(subscribeToNewsletter(email)).unwrap();
            return true;
        } catch {
            return false;
        }
    }, [dispatch]);

    const unsubscribe = useCallback(async (email) => {
        try {
            await dispatch(unsubscribeFromNewsletter(email)).unwrap();
            return true;
        } catch {
            return false;
        }
    }, [dispatch]);

    // Stable identity so consumers can safely use it as an effect dependency
    // (the Footer's auto-clear timer would otherwise restart on every render)
    const clearNewsletterMessages = useCallback(() => {
        dispatch(clearMessages());
    }, [dispatch]);

    return {
        isLoading,
        error,
        successMessage,
        subscribe,
        unsubscribe,
        clearNewsletterMessages
    };
};