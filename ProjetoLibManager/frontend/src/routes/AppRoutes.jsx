import { Routes, Route } from 'react-router-dom';
import { RotaProtegida } from './RotaProtegida.jsx';
import Login from '../pages/Login.jsx';
import Cadastro from '../pages/Cadastro.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Livros from '../pages/Livros.jsx';
import Usuarios from '../pages/Usuarios.jsx';
import Configuracoes from '../pages/Configuracoes.jsx';
import Historico from '../pages/Historico.jsx';
import Erro from '../pages/Erro.jsx';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            <Route element={<RotaProtegida />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/livros" element={<Livros />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path='/historico' element={<Historico />} />
            </Route>

            <Route path="*" element={<Erro />} />
        </Routes>
    );
}

export default AppRoutes;