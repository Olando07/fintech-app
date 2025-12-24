import { useState } from 'react';
import { Outlet, NavLink } from 'react-router';
import { Home, CreditCard, TrendingUp, MessageSquare, Menu, X } from 'lucide-react';

const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: 'transactions', icon: CreditCard, label: 'Transactions' },
    { path: 'analytics', icon: TrendingUp, label: 'Analytics' },
    {path: '/chat', icon: MessageSquare, label: 'AI Chat'},
];

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-950 text-white">
            <aside className={`bg-gray-900 trasition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}></aside>

        </div>
    )
}
