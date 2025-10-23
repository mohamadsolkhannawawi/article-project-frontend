import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Main Layout Component
function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-purple-100 via-purple-50 to-white">
            <Navbar />
            <main className="flex-grow pt-24">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default PublicLayout;
