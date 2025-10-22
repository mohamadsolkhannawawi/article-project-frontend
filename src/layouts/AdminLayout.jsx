import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLayout() {
    const { logout } = useAuth();

    // Helper for NavLink styling
    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? "bg-blue-800 text-white block px-4 py-2 rounded-md"
            : "text-gray-300 hover:bg-gray-700 hover:text-white block px-4 py-2 rounded-md";

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="px-6 py-4 text-2xl font-bold">MyBlog Admin</div>
                <nav className="flex-1 px-4 py-4 space-y-2">
                    <NavLink to="/" end className={getNavLinkClass}>
                        All Posts
                    </NavLink>
                    <NavLink to="/posts/new" className={getNavLinkClass}>
                        Add New
                    </NavLink>
                    {/* Add more links here later */}
                </nav>
                <div className="px-4 py-4">
                    <button
                        onClick={logout}
                        className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet /> {/* Child pages will be rendered here */}
            </main>
        </div>
    );
}

export default AdminLayout;
