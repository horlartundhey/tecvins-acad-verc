import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardStats } from '../redux/slices/dashboardSlice';

export const useDashboard = () => {
    const dispatch = useDispatch();
    const { stats, recentActivities, isLoading, error, hasLoaded } = useSelector((state) => state.dashboard);

    const loadDashboardStats = useCallback(() => {
        if (!isLoading && !hasLoaded) {
            dispatch(fetchDashboardStats());
        }
    }, [dispatch, isLoading, hasLoaded]);

    return {
        stats,
        recentActivities,
        isLoading,
        error,
        hasLoaded,
        loadDashboardStats
    };
};
