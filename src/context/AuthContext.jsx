import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser } from "../services/api";

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );
    const [loading, setLoading] = useState(false);

    // This effect runs on app load to check if a token exists
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await loginUser(email, password);
            const { token } = response.data.data;

            // Store the token
            localStorage.setItem("token", token);
            setToken(token);
            setIsAuthenticated(true);

            setLoading(false);
            return { success: true };
        } catch (error) {
            setLoading(false);
            setIsAuthenticated(false);
            return { success: false, error: error.message || "Login failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    // The value provided to consuming components
    const value = {
        isAuthenticated,
        token,
        user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};
