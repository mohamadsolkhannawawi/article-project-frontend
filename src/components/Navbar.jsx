import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, UserPlus } from "lucide-react";

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/blog");
    };

    return (
        <nav className="py-4 px-6 absolute top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-bold text-gray-900"
                >
                    <div className="w-8 h-8 flex items-center justify-center bg-purple-600 rounded-md text-white text-xl font-bold">
                        ✦
                    </div>
                    KataGenzi
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8">
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        to="/blog"
                        className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                    >
                        Blog
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                    >
                        About
                    </Link>
                    <Link
                        to="/authors"
                        className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                    >
                        Authors
                    </Link>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/admin"
                                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 flex items-center gap-1"
                            >
                                <LogIn size={18} /> Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
                            >
                                <UserPlus size={18} /> Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
