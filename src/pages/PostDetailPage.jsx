import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostByID } from "../services/api";
import ReactMarkdown from "react-markdown"; // We use this to render markdown content

// This function formats the date
const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

function PostDetailPage() {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await getPostByID(id);
                setPost(response.data);
            } catch (err) {
                setError(err.message || "Failed to fetch post.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]); // Re-fetch if the ID in the URL changes

    if (loading) {
        return <div className="text-center p-10">Loading post...</div>;
    }

    if (error) {
        return (
            <div className="text-center p-10 text-red-500">Error: {error}</div>
        );
    }

    if (!post) {
        return <div className="text-center p-10">Post not found.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                {/* Main Content (2/3 width) */}
                <div className="lg:col-span-2">
                    {/* Breadcrumbs */}
                    <nav className="text-sm mb-4">
                        <Link
                            to="/blog"
                            className="text-blue-600 hover:underline"
                        >
                            Blog
                        </Link>
                        <span className="mx-2 text-gray-400">&gt;</span>
                        <span className="text-gray-500">{post.title}</span>
                    </nav>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h1>

                    {/* Author Info */}
                    <div className="flex items-center space-x-2 mb-6">
                        <span className="font-medium">
                            {post.author?.full_name || "Anonymous"}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">
                            {formatDate(post.CreatedAt)}
                        </span>
                    </div>

                    {/* Featured Image */}
                    <img
                        src={
                            post.featured_image_url ||
                            "https://via.placeholder.com/800x450"
                        }
                        alt={post.title}
                        className="w-full h-auto object-cover rounded-lg mb-8"
                    />

                    {/* Markdown Content */}
                    <div className="prose lg:prose-lg max-w-none">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </div>

                {/* Sidebar (1/3 width) */}
                <aside className="mt-12 lg:mt-0">
                    <div className="sticky top-8 bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">
                            Latest Posts
                        </h3>
                        {/* We can add a fetch for latest posts here later */}
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Post 1...
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Post 2...
                                </a>
                            </li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-8 mb-4">
                            Categories
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Technology
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">
                                    Finance
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default PostDetailPage;
