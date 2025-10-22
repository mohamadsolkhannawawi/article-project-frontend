import React from "react";
import { Outlet, Link } from "react-router-dom";

// Mini-component for the Navbar
const Navbar = () => (
    <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex">
                    <Link
                        to="/"
                        className="flex-shrink-0 flex items-center text-xl font-bold text-gray-900"
                    >
                        Paynext
                    </Link>
                </div>
                <div className="flex items-center space-x-8">
                    <Link
                        to="/"
                        className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Home
                    </Link>
                    <a
                        href="#"
                        className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Pricing
                    </a>
                    <Link
                        to="/blog"
                        className="text-gray-900 border-b-2 border-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Blog
                    </Link>
                </div>
                <div className="flex items-center">
                    <a
                        href="#"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                        Get in Touch
                    </a>
                </div>
            </div>
        </div>
    </nav>
);

// Mini-component for the Footer
const Footer = () => (
    <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Column 1 */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Company
                    </h3>
                    <ul className="mt-4 space-y-4">
                        <li>
                            <a
                                href="#"
                                className="text-base text-gray-500 hover:text-gray-900"
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-base text-gray-500 hover:text-gray-900"
                            >
                                Careers
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-base text-gray-500 hover:text-gray-900"
                            >
                                Blog
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Column 2 */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Help
                    </h3>
                    <ul className="mt-4 space-y-4">
                        <li>
                            <a
                                href="#"
                                className="text-base text-gray-500 hover:text-gray-900"
                            >
                                FAQ
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-base text-gray-500 hover:text-gray-900"
                            >
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Columns 3 & 4 can be added later */}
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8">
                <p className="text-base text-gray-400 xl:text-center">
                    © 2025 Paynext. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);

// Main Layout Component
function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Child pages (HomePage, PostDetailPage) will be rendered here */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default PublicLayout;
