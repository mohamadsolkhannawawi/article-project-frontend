import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Main Layout Component
function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col relative">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default PublicLayout;
