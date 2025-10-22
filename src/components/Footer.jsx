import React from "react";
import { Link } from "react-router-dom";
import {
    Info,
    HelpCircle,
    BookOpen,
    Briefcase,
    MessageCircle,
} from "lucide-react";

function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Info */}
                <div className="col-span-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        KataGenzi
                    </h3>
                    <p className="text-gray-600 text-sm">
                        A clean, minimalist platform for thoughtful articles
                        from our community. Write, share, connect.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <BookOpen size={20} className="text-purple-400" />{" "}
                        Company
                    </h4>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/about"
                                className="text-gray-500 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2"
                            >
                                <Info size={16} /> About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/careers"
                                className="text-gray-500 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2"
                            >
                                <Briefcase size={16} /> Careers
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/blog"
                                className="text-gray-500 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2"
                            >
                                <BookOpen size={16} /> Blog
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Help Links */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <HelpCircle size={20} className="text-purple-400" />{" "}
                        Help
                    </h4>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/faq"
                                className="text-gray-500 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2"
                            >
                                <MessageCircle size={16} /> FAQ
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-gray-500 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2"
                            >
                                <MessageCircle size={16} /> Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 mt-10 pt-8 text-center text-gray-500 text-sm">
                © 2025 KataGenzi. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
