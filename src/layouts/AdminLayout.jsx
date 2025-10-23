import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    LayoutDashboard,
    FileText,
    Plus,
    Users,
    ArrowLeftFromLine,
    Settings,
    LogOut,
} from "lucide-react";

function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    // Helper for NavLink styling
    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? "flex items-center gap-3 bg-gray-800 text-purple-400 px-4 py-2 rounded-md transition-colors duration-200"
            : "flex items-center gap-3 text-gray-300 hover:bg-gray-800 hover:text-purple-400 px-4 py-2 rounded-md transition-colors duration-200";

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
                {/* Logo */}
                <NavLink
                    to="/admin"
                    className="flex items-center gap-2 text-2xl font-bold text-white mb-8"
                >
                    <div className="w-8 h-8 flex items-center justify-center bg-purple-600 rounded-md text-white text-xl font-bold">
                        ✦
                    </div>
                    Ruang Rasa
                </NavLink>

                {/* Navigation */}
                <nav className="flex-grow">
                    <ul className="space-y-4">
                        <li>
                            <NavLink
                                to="/admin"
                                end
                                className={getNavLinkClass}
                            >
                                {" "}
                                {/* Link to the new dashboard page */}
                                <LayoutDashboard size={20} /> Publikasimu
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/posts"
                                className={getNavLinkClass}
                            >
                                <FileText size={20} /> Ceritamu
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/users"
                                className={getNavLinkClass}
                            >
                                <Users size={20} /> Tentangmu
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/settings"
                                className={getNavLinkClass}
                            >
                                <Settings size={20} /> Settings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/blog" // Link to the public blog page
                                className={getNavLinkClass}
                            >
                                <ArrowLeftFromLine size={20} /> Cerita Kita
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-gray-300 hover:text-red-400 hover:bg-gray-800 px-4 py-2 rounded-md transition-colors duration-200 mt-auto"
                >
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet /> {/* Child pages will be rendered here */}
            </main>
        </div>
    );
}

export default AdminLayout;
