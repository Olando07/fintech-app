import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router";
import { Home, CreditCard, TrendingUp, MessageSquare, Menu, X } from "lucide-react";
import { trackEvent } from "./lib/n8n";

const navItems = [
	{ path: "/", icon: Home, label: "Dashboard" },
	{ path: "transactions", icon: CreditCard, label: "Transactions" },
	{ path: "analytics", icon: TrendingUp, label: "Analytics" },
	{ path: "/chat", icon: MessageSquare, label: "AI Chat" },
];

export default function Layout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	useEffect(() => {
		trackEvent("page_visit", { page: "App loaded" });
	}, []);

	return (
        <div className="flex h-screen bg-gray-950 text-white w-full">
            {/* Sidebar */}
			<aside className={`bg-gray-900 trasition-all duration-300 ${isSidebarOpen ? "w-64" : "w-22"}`}>
				<div className="p-4 border-b border-gray-800">
					<button
						onClick={() => {
							setIsSidebarOpen(!isSidebarOpen);
						}}
						className="p-2 hover:bg-gray-800 rounded-lg"
					>
						{isSidebarOpen ? <X size="22" /> : <Menu size="22" />}
					</button>
				</div>

				<nav className="p-4 space-y-2">
					{navItems.map(({path, icon: Icon, label}) => (
						<NavLink
							key={path}
							to={path}
							end={path === "/"}
							className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-sky-500 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
						>
							<Icon size={20} />
							{isSidebarOpen && <span>{label}</span>}
						</NavLink>
					))}
				</nav>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
		</div>
	);
}
