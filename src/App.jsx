import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";

// Admin Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AllPostsPage from "./pages/AllPostsPage";
import AddNewPostPage from "./pages/AddNewPostPage";
import EditPostPage from "./pages/EditPostPage";

// Public Pages
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import "./index.css";

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {/* --- ADMIN ROUTES --- */}

                {/* /login : Public page for logging in */}
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/admin" replace />
                        ) : (
                            <LoginPage />
                        )
                    }
                />

                {/* /register : Public page for creating a new user */}
                <Route
                    path="/register"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/admin" replace />
                        ) : (
                            <RegisterPage />
                        )
                    }
                />

                {/* /admin/* : All admin routes are protected and use AdminLayout */}
                <Route path="/admin" element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        {/* The /admin path now renders its own dashboard page */}
                        <Route index element={<AdminDashboardPage />} />
                        <Route path="posts" element={<AllPostsPage />} />
                        <Route path="posts/new" element={<AddNewPostPage />} />
                        <Route
                            path="posts/edit/:id"
                            element={<EditPostPage />}
                        />
                    </Route>
                </Route>

                {/* --- PUBLIC BLOG ROUTES --- */}

                {/* /* : All public routes use PublicLayout */}
                <Route path="/" element={<PublicLayout />}>
                    {/* Redirect the root "/" path to "/blog" */}
                    <Route index element={<Navigate to="/blog" replace />} />
                    <Route path="blog" element={<HomePage />} />
                    <Route path="blog/:id" element={<PostDetailPage />} />
                    {/* This route is ready for our next step */}
                    {/* <Route path="blog/:id" element={<PostDetailPage />} /> */}
                </Route>

                {/* Fallback 404 route */}
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
