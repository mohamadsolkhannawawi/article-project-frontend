import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import AllPostsPage from "./pages/AllPostsPage";
import AddNewPostPage from "./pages/AddNewPostPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./routes/ProtectedRoute"; // Import the gatekeeper
import "./index.css";

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {/*
                  Public Route: /login
                  If the user is already authenticated, redirect them to the dashboard.
                  Otherwise, show the LoginPage.
                */}
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/" replace />
                        ) : (
                            <LoginPage />
                        )
                    }
                />
                {/* Protected Admin Routes */}
                <Route path="/" element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        {/* <-- WRAP WITH LAYOUT */}
                        <Route index element={<AllPostsPage />} />
                        {/* <-- USE NEW PAGE */}
                        <Route path="posts/new" element={<AddNewPostPage />} />
                        {/* ... other admin routes ... */}
                    </Route>
                </Route>

                {/* Fallback route for 404 Not Found */}
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
