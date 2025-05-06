import { useSelector, useDispatch } from 'react-redux';
import { login, register, logout } from '../redux/slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

    const handleLogin = async (credentials) => {
        try {
            await dispatch(login(credentials)).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleRegister = async (userData) => {
        try {
            await dispatch(register(userData)).unwrap();
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout
    };
};