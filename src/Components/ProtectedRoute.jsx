import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const isAuthenticated = () => {
        try {
            const adminToken = localStorage.getItem('admin_token');
            if (!adminToken) return false;
            
            // You could add additional validation here
            // For example, check token expiry or validate with backend
            
            return true;
        } catch (err) {
            return false;
        }
    };

    if (!isAuthenticated()) {
        // Redirect to admin login if not authenticated
        return <Navigate to="/ap-admin" replace />;
    }

    return children;
}