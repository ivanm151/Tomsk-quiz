import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, QrCodeIcon, TrophyIcon, GiftIcon, UserIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

function Navbar() {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: HomeIcon, label: 'Квизы' },
        { path: '/scanner', icon: QrCodeIcon, label: 'Сканер' },
        { path: '/rating', icon: TrophyIcon, label: 'Рейтинг' },
        { path: '/prizes', icon: GiftIcon, label: 'Призы' },
        { path: '/profile', icon: UserIcon, label: 'Профиль' },
        { path: '/create-quiz', icon: PlusCircleIcon, label: 'Создать' },
    ];

    return (
        <nav className="navbar">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                    <item.icon className="navbar-icon" />
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
    );
}

export default Navbar;