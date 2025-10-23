import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import {
    Eye,
    EyeOff,
    ArrowRight,
    Lock,
    AlertCircle,
    CircleAlert,
} from "lucide-react";
import Logo from "../assets/LogoKataGenzi.svg";

function RegisterPage() {
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);

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

    useEffect(() => {
        // Validate password only when there are changes
        if (password || email || fullName) {
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
            if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
                errors.push("one special character");
            }
            if (
                fullName &&
                password.toLowerCase().includes(fullName.toLowerCase())
            ) {
                errors.push("should not contain your full name");
            }
            if (email) {
                const emailUsername = email.split("@")[0];
                if (
                    emailUsername &&
                    password.toLowerCase().includes(emailUsername.toLowerCase())
                ) {
                    errors.push("should not contain part of your email");
                }
            }
            setPasswordErrors(errors);
        }
    }, [password, email, fullName]);

    // Check if passwords match
    const passwordsMatch = password === passwordConfirm && password !== "";
    const hasPasswordError = password && passwordConfirm && !passwordsMatch;
    const isPasswordInvalid = passwordErrors.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state
        console.log("[RegisterPage] Form submitted - Checking validation...");

        // 1. Validate Sequentially: Full Name (first field)
        if (!fullName.trim()) {
            console.log("[RegisterPage] fullName is empty, focusing...");
            setError("Isi semua, agar kita bisa berbagi rasa!");
            fullNameRef.current?.focus();
            return;
        }

        // 2. Validate Sequentially: Email (second field)
        if (!email.trim()) {
            console.log("[RegisterPage] email is empty, focusing...");
            setError("Email Address is required.");
            emailRef.current?.focus();
            return;
        }

        // 3. Validate Sequentially: Password (third field)
        if (!password.trim()) {
            console.log("[RegisterPage] password is empty, focusing...");
            setError("Password is required.");
            passwordRef.current?.focus();
            return;
        }

        // 4. Validate Sequentially: Password Confirmation (fourth field)
        if (!passwordConfirm.trim()) {
            console.log("[RegisterPage] passwordConfirm is empty, focusing...");
            setError("Password Confirmation is required.");
            passwordConfirmRef.current?.focus();
            return;
        }

        // 5. Validate Password Complexity
        if (isPasswordInvalid) {
            console.log("[RegisterPage] Password complexity check failed");
            setError(
                "Your password does not meet all the complexity requirements."
            );
            passwordRef.current?.focus();
            return;
        }

        // 6. Validate Password Confirmation
        if (hasPasswordError) {
            console.log("[RegisterPage] Passwords do not match");
            setError("Password and Password Confirmation do not match.");
            passwordConfirmRef.current?.focus();
            return;
        }

        // All validations successful, proceed to register
        console.log(
            "[RegisterPage] All validations passed, proceeding with registration..."
        );
        setLoading(true);
        try {
            await registerUser(fullName, email, password);
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
                    <img
                        src={Logo}
                        alt="KataGenzi Logo"
                        className="auth-logo"
                    />
                    <h1 className="auth-title">Sign Up For Free</h1>
                    <p className="auth-subtitle">
                        Temukan maknanya, dalam setiap kata, <br /> Daftar
                        sekarang juga!
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
                            ref={fullNameRef}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="form-input"
                            placeholder="Enter your full name"
                            // required
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
                            ref={emailRef}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="Enter your email"
                            // required
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
                                ref={passwordRef}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input w-full"
                                placeholder="••••••••••"
                                // required
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
                                <span className="error-icon">
                                    <CircleAlert
                                        size={18}
                                        className="text-red-500"
                                    />
                                </span>
                                <span>
                                    Password must contain:{" "}
                                    {passwordErrors.join(", ")}
                                </span>
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
                                ref={passwordConfirmRef}
                                value={passwordConfirm}
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                                className={`form-input w-full ${
                                    hasPasswordError ? "border-red-500" : ""
                                }`}
                                placeholder="••••••••••"
                                // required
                            />
                            <div className="form-input-icon">
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
                            </div>
                        </div>

                        {/* Password Error */}
                        {hasPasswordError && (
                            <div className="error-message">
                                <span className="error-icon">
                                    <CircleAlert
                                        size={18}
                                        className="text-red-500"
                                    />
                                </span>
                                <span>ERROR: Password do not match!</span>
                            </div>
                        )}
                    </div>

                    {/* General Error Message */}
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
