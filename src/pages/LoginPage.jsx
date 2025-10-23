import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
    Eye,
    EyeOff,
    ArrowRight,
    Facebook,
    Mail,
    Instagram,
    CircleAlert,
} from "lucide-react";
import Logo from "../assets/LogoKataGenzi.svg";

function LoginPage() {
    // useState hooks to manage form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // Get login function and loading state from our context
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const result = await login(email, password);

        if (!result.success) {
            setError(
                "Email atau sandimu salah, atau rasamu yang berubah? Coba Lagi ya!"
            );
        } else {
            // Login successful, redirect to the dashboard
            navigate("/admin", { replace: true });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* Header with Logo */}
                <div className="auth-header">
                    <img
                        src={Logo}
                        alt="KataGenzi Logo"
                        className="auth-logo"
                    />
                    <h1 className="auth-title">Let's Sign In</h1>
                    <p className="auth-subtitle">
                        Temukan maknanya, dalam setiap kata
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input w-full"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="form-input-icon"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">
                                <CircleAlert
                                    size={18}
                                    className="text-red-500"
                                />
                            </span>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                        <ArrowRight size={18} />
                    </button>
                </form>

                {/* Social Login */}
                <div className="social-login">
                    <button
                        type="button"
                        className="social-icon"
                        title="Facebook"
                        onClick={() => console.log("Facebook login")}
                    >
                        <Facebook size={20} />
                    </button>
                    <button
                        type="button"
                        className="social-icon"
                        title="Google"
                        onClick={() => console.log("Google login")}
                    >
                        <Mail size={20} />
                    </button>
                    <button
                        type="button"
                        className="social-icon"
                        title="Instagram"
                        onClick={() => console.log("Instagram login")}
                    >
                        <Instagram size={20} />
                    </button>
                </div>

                {/* Links */}
                <div className="auth-links">
                    <div>
                        <span className="auth-link-text">
                            Don't have an account?{" "}
                        </span>
                        <Link to="/register" className="auth-link">
                            Sign Up
                        </Link>
                    </div>
                    <a href="#forgot" className="auth-link">
                        Forgot Password
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
