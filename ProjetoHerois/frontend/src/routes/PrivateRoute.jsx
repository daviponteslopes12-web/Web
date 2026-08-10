import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PrivateRoute({ children }) {
    const { autenticado } = useAuth();

    if (!autenticado) return <Navigate to="/login" />;

    return children;
}