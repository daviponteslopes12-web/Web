import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Sidebar from '../components/Sidebar.jsx';

export function RotaProtegida() {

    const { token, carregando } = useAuth();

    if (carregando) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Carregando...</p>
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    );
}