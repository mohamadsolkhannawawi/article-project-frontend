import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("theme");
            const prefersDark =
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches;
            const initial = stored ? stored === "dark" : prefersDark;
            setIsDark(initial);
            if (initial) {
                const root = document.documentElement;
                root.classList.add("theme-dark");
                root.classList.add("dark");
            }
        } catch {
            // ignore
        }
    }, []);

    const toggle = () => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.remove("theme-dark");
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            root.classList.add("theme-dark");
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggle}
            aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            title={isDark ? "Light" : "Dark"}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
            {isDark ? (
                // Sun icon
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10 3.5a.75.75 0 01.75-.75h0a.75.75 0 010 1.5H10.75A.75.75 0 0110 3.5zM10 16.25a.75.75 0 01.75-.75h0a.75.75 0 010 1.5H10.75a.75.75 0 01-.75-.75zM3.5 10a.75.75 0 01-.75-.75v0a.75.75 0 011.5 0V10.75A.75.75 0 013.5 10zM16.25 10a.75.75 0 01-.75-.75v0a.75.75 0 011.5 0V10.75a.75.75 0 01-.75.75zM5.22 5.22a.75.75 0 01-1.06 0 .75.75 0 010-1.06l0 0a.75.75 0 011.06 0l0 0a.75.75 0 010 1.06zM15.04 14.04a.75.75 0 01-1.06 0 .75.75 0 010-1.06l0 0a.75.75 0 011.06 0l0 0a.75.75 0 010 1.06zM5.22 14.78a.75.75 0 01-1.06 0 .75.75 0 010-1.06l0 0a.75.75 0 011.06 0l0 0a.75.75 0 010 1.06zM15.04 5.96a.75.75 0 01-1.06 0 .75.75 0 010-1.06l0 0a.75.75 0 011.06 0l0 0a.75.75 0 010 1.06zM10 6.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                </svg>
            ) : (
                // Moon icon
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M17.293 13.293A8 8 0 116.707 2.707a6 6 0 1010.586 10.586z" />
                </svg>
            )}
        </button>
    );
}
