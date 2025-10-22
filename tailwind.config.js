import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui"],
                heading: ["DM Serif Display", "serif"],
            },
            colors: {
                // KataGenzi Brand Colors
                kata: {
                    primary: "var(--kata-primary)", // Purple: #7C3AED
                    primaryDark: "var(--kata-primary-dark)", // Darker purple: #6D28D9
                    accent: "var(--kata-accent)", // Indigo: #4F46E5
                    light: "var(--kata-light)", // Light gray: #F3F4F6
                    border: "var(--kata-border)", // Border gray: #E5E7EB
                    text: "var(--kata-text)", // Dark text: #111827
                    textLight: "var(--kata-text-light)", // Light text: #6B7280
                    error: "var(--kata-error)", // Error red: #EF4444
                },
                brand: {
                    DEFAULT: "var(--brand-color)",
                    accent: "var(--brand-accent)",
                },
                gray: {
                    50: "var(--gray-50)",
                    100: "var(--gray-100)",
                    200: "var(--gray-200)",
                    300: "var(--gray-300)",
                    400: "var(--gray-400)",
                    500: "var(--gray-500)",
                    600: "var(--gray-600)",
                    700: "var(--gray-700)",
                    800: "var(--gray-800)",
                    900: "var(--gray-900)",
                },
                red: {
                    500: "var(--danger-500)",
                    700: "var(--danger-700)",
                },
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme("colors.gray.800"),
                        a: {
                            color: theme("colors.paynext.500"),
                            textDecoration: "none",
                            fontWeight: "500",
                            "&:hover": {
                                color: theme("colors.paynext.600"),
                                textDecoration: "underline",
                            },
                        },
                        h1: {
                            color: theme("colors.gray.900"),
                            fontWeight: "800",
                            letterSpacing: "-0.02em",
                        },
                        h2: {
                            color: theme("colors.gray.900"),
                            fontWeight: "700",
                        },
                        h3: {
                            color: theme("colors.gray.900"),
                            fontWeight: "600",
                        },
                        strong: { color: theme("colors.gray.900") },
                        code: {
                            color: theme("colors.pink.600"),
                            backgroundColor: theme("colors.gray.100"),
                            padding: "0.15rem 0.35rem",
                            borderRadius: "6px",
                            fontWeight: "600",
                        },
                        pre: {
                            backgroundColor: theme("colors.gray.900"),
                            color: theme("colors.gray.100"),
                            padding: "1rem",
                            borderRadius: "0.5rem",
                        },
                        blockquote: {
                            color: theme("colors.gray.700"),
                            borderLeftColor: theme("colors.gray.300"),
                            fontStyle: "italic",
                        },
                        "ul > li::marker": {
                            color: theme("colors.paynext.500"),
                        },
                        "ol > li::marker": {
                            color: theme("colors.paynext.500"),
                        },
                        "h2 code": { color: theme("colors.gray.700") },
                    },
                },
                lg: {
                    css: {
                        h1: { fontSize: "2.5rem" },
                    },
                },
                invert: {
                    css: {
                        color: theme("colors.gray.200"),
                        a: { color: theme("colors.paynext.500") },
                        h1: { color: theme("colors.white") },
                        h2: { color: theme("colors.gray.100") },
                        code: { color: theme("colors.pink.400") },
                        pre: { backgroundColor: theme("colors.gray.800") },
                    },
                },
            }),
        },
    },
    plugins: [typography],
};
