import { Outlet, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/galeria', label: 'Galeria' },
    { to: '/herois', label: 'Heróis' },
    { to: '/guildas', label: 'Guildas' },
    { to: '/missoes', label: 'Missões' },
    { to: '/loja', label: 'Loja' },
    { to: '/configuracoes', label: 'Config' }
];

export default function Layout() {
    const { usuario, logout } = useAuth();

    const progressoXp = usuario ? (usuario.xp / (usuario.nivel * 100)) * 100 : 0;

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-text-muted/10 flex flex-col fixed h-full">
                {/* Logo */}
                <div className="p-6 border-b border-text-muted/10">
                    <h1 className="font-display font-bold text-xl text-accent tracking-wider">
                        PROJETO HERÓIS
                    </h1>
                </div>

                {/* Stats */}
                <div className="p-4 border-b border-text-muted/10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-text-primary">
                            {usuario?.nome}
                        </span>
                        <span className="text-accent font-bold">
                            Lv.{usuario?.nivel}
                        </span>
                    </div>

                    {/* Barra de XP */}
                    <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden mb-2">
                        <div
                            className="h-full bg-accent rounded-full transition-all duration-500"
                            style={{ width: `${progressoXp}%` }}
                        />
                    </div>
                    <span className="text-text-muted text-xs">
                        {usuario?.xp} / {usuario?.nivel * 100} XP
                    </span>

                    {/* Moedas */}
                    <div className="mt-3 flex items-center gap-2">
                        <span className="text-accent text-lg">🪙</span>
                        <span className="font-bold text-text-primary">
                            {usuario?.moedas}
                        </span>
                    </div>
                </div>

                {/* Navegação */}
                <nav className="flex-1 p-4 flex flex-col gap-1">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) => `
                                px-4 py-3 rounded-lg text-sm transition-all duration-200
                                ${isActive
                                    ? 'bg-accent/10 text-accent border-l-2 border-accent'
                                    : 'text-text-muted hover:text-text-primary hover:bg-surface-light'
                                }
                            `}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-text-muted/10">
                    <button
                        onClick={logout}
                        className="w-full px-4 py-3 text-left text-danger/70 hover:text-danger
                                   hover:bg-danger/10 rounded-lg text-sm transition-colors cursor-pointer"
                    >
                        Sair da conta
                    </button>
                </div>
            </aside>

            {/* Conteúdo */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
}