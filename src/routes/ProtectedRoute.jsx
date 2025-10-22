import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    // Show a loading indicator while auth status is being checked
    if (loading) {
        return <div>Loading...</div>; // Or a proper spinner component
    }

    // If authenticated, render the child route (e.g., DashboardPage)
    // <Outlet> is the placeholder for the child component
    if (isAuthenticated) {
        return <Outlet />;
    }

    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
