import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardStats } from '../redux/slices/dashboardSlice';

export const useDashboard = () => {
    const dispatch = useDispatch();
    const { stats, recentActivities, isLoading, error, hasLoaded } = useSelector((state) => state.dashboard);

    const loadDashboardStats = useCallback(() => {
        // Prevent repeated calls if there's an auth error
        if (!isLoading && !hasLoaded && !error?.includes('401')) {
            dispatch(fetchDashboardStats());
        }
    }, [dispatch, isLoading, hasLoaded, error]);

    return {
        stats,
        recentActivities,
        isLoading,
        error,
        hasLoaded,
        loadDashboardStats
    };
};
