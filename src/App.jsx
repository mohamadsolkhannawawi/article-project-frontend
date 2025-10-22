import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the gatekeeper
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

                {/*
          Protected Routes: / (Dashboard)
          We wrap these routes in our <ProtectedRoute /> component.
        */}
                <Route path="/" element={<ProtectedRoute />}>
                    {/* The <Outlet /> in ProtectedRoute will render this 'index' route */}
                    <Route index element={<DashboardPage />} />

                    {/* We will add other admin routes here later:
            <Route path="posts" element={<AllPostsPage />} />
            <Route path="posts/new" element={<AddNewPostPage />} />
            <Route path="posts/edit/:id" element={<EditPostPage />} />
          */}
                </Route>

                {/* Fallback route for 404 Not Found */}
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
