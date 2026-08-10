import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/ui/Layout';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import Galeria from '../pages/Galeria';
import TodosHerois from '../pages/TodosHerois';
import Missoes from '../pages/Missoes';
import Loja from '../pages/Loja';
import Configuracoes from '../pages/Configuracoes';
import Guildas from '../pages/Guildas';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            <Route path="/" element={
                <PrivateRoute>
                    <Layout />
                </PrivateRoute>
            }>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="galeria" element={<Galeria />} />
                <Route path="herois" element={<TodosHerois />} />
                <Route path="guildas" element={<Guildas />} />
                <Route path="missoes" element={<Missoes />} />
                <Route path="loja" element={<Loja />} />
                <Route path="configuracoes" element={<Configuracoes />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}