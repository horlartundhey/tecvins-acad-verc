import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, roles = [] }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (roles.length > 0 && !roles.includes(user?.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;