// src/Components/Auth/ProtectedRoute.jsx
import { useAuth } from '../../Context/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Cargando...</div>;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const userRole = user.roles[0]?.id;
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;