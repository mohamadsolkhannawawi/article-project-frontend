import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Lock, AlertCircle } from "lucide-react";

function RegisterPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState([]);

    const { login } = useAuth();
    const navigate = useNavigate();

    const validatePassword = () => {
        const errors = [];
        if (password.length < 12) {
            errors.push("at least 12 characters");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("one lowercase letter");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("one uppercase letter");
        }
        if (!/\d/.test(password)) {
            errors.push("one number");
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            errors.push("one special character");
        }
        if (fullName && password.toLowerCase().includes(fullName.toLowerCase())) {
            errors.push("should not contain your full name");
        }
        if (email) {
            const emailUsername = email.split('@')[0];
            if (emailUsername && password.toLowerCase().includes(emailUsername.toLowerCase())) {
                errors.push("should not contain part of your email");
            }
        }
        setPasswordErrors(errors);
    };

    useEffect(() => {
        if (password || email || fullName) {
            validatePassword();
        }
    }, [password, email, fullName]);

    // Check if passwords match
    const passwordsMatch = password === passwordConfirm && password !== "";
    const hasPasswordError = password && passwordConfirm && !passwordsMatch;
    const isPasswordInvalid = passwordErrors.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate passwords match
        if (!passwordsMatch || isPasswordInvalid) {
            return;
        }

        setLoading(true);
        try {
            // registerUser is expected to exist in api.js and return data
            await registerUser(fullName, email, password);
            // Immediately log the user in
            const res = await login(email, password);
            if (res.success) {
                navigate("/admin", { replace: true });
            } else {
                setError(res.error || "Failed to login after registration.");
            }
        } catch (err) {
            setError(err?.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* Header with Logo */}
                <div className="auth-header">
                    <div className="auth-logo">✦</div>
                    <h1 className="auth-title">Sign Up For Free</h1>
                    <p className="auth-subtitle">
                        Join us for less than 1 minute, with no cost.
                    </p>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Full Name Field */}
                    <div className="form-group">
                        <label htmlFor="fullName" className="form-label">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="form-input"
                            placeholder="Enter your full name..."
                            required
                        />
                    </div>

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
                            placeholder="Enter your email..."
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
                                placeholder="••••••••••"
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
                        {password && isPasswordInvalid && (
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                <span>Password must contain: {passwordErrors.join(", ")}</span>
                            </div>
                        )}
                    </div>

                    {/* Password Confirmation Field */}
                    <div className="form-group">
                        <label htmlFor="passwordConfirm" className="form-label">
                            Password Confirmation
                        </label>
                        <div className="form-input-wrapper">
                            <input
                                id="passwordConfirm"
                                type={showPasswordConfirm ? "text" : "password"}
                                value={passwordConfirm}
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                                className={`form-input w-full ${
                                    hasPasswordError ? "border-red-500" : ""
                                }`}
                                placeholder="••••••••••"
                                required
                            />
                            <div className="form-input-icon">
                                {hasPasswordError ? (
                                    <AlertCircle
                                        size={18}
                                        className="text-red-500"
                                    />
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswordConfirm(
                                                !showPasswordConfirm
                                            )
                                        }
                                    >
                                        {showPasswordConfirm ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Password Error */}
                        {hasPasswordError && (
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                <span>ERROR: Password do not match!</span>
                            </div>
                        )}
                    </div>

                    {/* General Error Message */}
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || hasPasswordError || isPasswordInvalid}
                        className="btn-primary"
                    >
                        {loading ? "Creating..." : "Sign Up"}
                        <ArrowRight size={18} />
                    </button>
                </form>

                {/* Links */}
                <div className="auth-links">
                    <div>
                        <span className="auth-link-text">
                            Already have an account?{" "}
                        </span>
                        <Link to="/login" className="auth-link">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
