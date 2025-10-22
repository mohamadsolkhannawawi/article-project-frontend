import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    // useState hooks to manage form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Get login function and loading state from our context
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const result = await login(email, password);

        if (!result.success) {
            setError(result.error || "Invalid credentials. Please try again.");
        } else {
            // Login successful, redirect to the dashboard
            navigate("/", { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="user@example.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="******************"
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-xs italic mb-4">
                            {error}
                        </p>
                    )}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-blue-300"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
