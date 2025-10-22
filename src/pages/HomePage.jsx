import React, { useState, useEffect } from "react";
import { getPosts } from "../services/api"; // We use getPosts (public), NOT getAdminPosts
import { Link } from "react-router-dom";

// Small component for a post card
const PostCard = ({ post }) => (
    <Link to={`/blog/${post.ID}`} className="block group">
        <div className="overflow-hidden rounded-lg">
            <img
                src={
                    post.featured_image_url ||
                    "https://via.placeholder.com/400x250"
                }
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="mt-4">
            <p className="text-sm font-medium text-blue-600">{post.category}</p>
            <h3 className="text-xl font-semibold text-gray-900 mt-2 group-hover:text-blue-600">
                {post.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2">Nov 20, 2024</p>{" "}
            {/* We will replace this with post.created_at later */}
        </div>
    </Link>
);

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError("");
            try {
                // getPosts will only return 'published' posts
                const response = await getPosts();
                setPosts(response.data || []);
            } catch (err) {
                setError(err.message || "Failed to fetch posts.");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Hero Section (from design) */}
            <div className="text-center bg-blue-700 text-white p-16 rounded-lg mb-16">
                <h1 className="text-5xl font-bold">
                    Stay Updated On Digital Payment
                </h1>
                <p className="text-xl mt-4 max-w-2xl mx-auto">
                    Get the latest insights and trends in digital payments, all
                    in one place.
                </p>
            </div>

            {/* All Articles Section */}
            <h2 className="text-3xl font-bold mb-8">All Articles</h2>

            {loading && <p>Loading articles...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard key={post.ID} post={post} />
                        ))
                    ) : (
                        <p>No published articles found.</p>
                    )}
                </div>
            )}

            {/* Pagination will be added here later */}
        </div>
    );
}

export default HomePage;
