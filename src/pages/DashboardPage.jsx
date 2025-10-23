import React from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth

function DashboardPage() {
    const { logout } = useAuth(); // Get the logout function

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Ruang Rasa</h1>
            <p className="mb-6">Selamat datang di Ruang Rasa!</p>
            <button
                onClick={logout} // Add logout functionality
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Logout
            </button>
        </div>
    );
}

export default DashboardPage;
