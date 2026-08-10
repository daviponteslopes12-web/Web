import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

function Sidebar() {

    const { bibliotecario, logout } = useAuth();

    const links = [
        { to: '/', label: 'Início' },
        { to: '/livros', label: 'Livros' },
        { to: '/usuarios', label: 'Usuários' },
        { to: '/configuracoes', label: 'Ajustes' },
        { to: '/historico', label: 'Histórico' },
    ];

    return (
        <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col h-screen">

            {/* Logo */}
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-xl font-bold text-white">LibManager</h1>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                end={link.to === '/'}
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-gray-700 text-white'
                                            : 'hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bibliotecário + Logout */}
            <div className="p-4 border-t border-gray-700">
                <p className="text-sm text-white mb-1">{bibliotecario?.nome}</p>
                <p className="text-xs text-gray-500 mb-3">{bibliotecario?.email}</p>
                <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Sair
                </button>
            </div>

        </aside>
    );
}

export default Sidebar;