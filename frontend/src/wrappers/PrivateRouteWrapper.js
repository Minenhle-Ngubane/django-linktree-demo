import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';


const PrivateRouteWrapper = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />
};

export default PrivateRouteWrapper;
