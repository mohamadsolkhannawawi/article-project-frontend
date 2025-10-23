import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostByID, getPosts } from "../services/api";
import ReactMarkdown from "react-markdown"; // We use this to render markdown content
import Sidebar from "../components/Sidebar";
import { Calendar, User } from "lucide-react";

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
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await getPostByID(id);
                setPost(response.data);

                // Fetch latest posts for the sidebar
                const resLatest = await getPosts(5, 0);
                setLatest(resLatest.data || []);
            } catch (err) {
                setError(err.message || "Failed to fetch post.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]); // Re-fetch if the ID in the URL changes

    if (loading) {
        return <div className="text-center p-10">Memuat Detail Makna...</div>;
    }

    if (error) {
        return (
            <div className="text-center p-10 text-red-500">Error: {error}</div>
        ); // Keep red-500 for errors
    }

    if (!post) {
        return <div className="text-center p-10">Makna tidak ditemukan.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                {/* Main Content (2/3 width) */}
                <div className="lg:col-span-2">
                    {/* Breadcrumbs */}
                    <nav className="text-sm mb-6">
                        <Link
                            to="/blog"
                            className="text-purple-600 hover:underline"
                        >
                            Kata & Rasa
                        </Link>
                        <span className="mx-2 text-gray-400">&gt;</span>
                        <span className="text-gray-500">{post.title}</span>
                    </nav>

                    {/* Title and Meta */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Author and Date Info */}
                    {/* Author Info */}
                    <div className="flex items-center space-x-2 mb-6 text-sm text-gray-600">
                        <span className="font-medium flex items-center gap-1">
                            <User size={16} className="text-purple-500" />
                            {post.author?.full_name || "Anonymous"}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="flex items-center gap-1">
                            <Calendar size={16} className="text-purple-500" />
                            {formatDate(post.CreatedAt)}
                        </span>
                    </div>

                    {/* Featured Image */}
                    <img
                        src={
                            post.featured_image_url ||
                            "https://via.placeholder.com/800x450?text=KataGenzi"
                        }
                        alt={post.title}
                        className="w-full h-auto object-cover rounded-xl mb-8 shadow-lg"
                    />

                    {/* Markdown Content */}
                    <article className="prose prose-purple lg:prose-xl max-w-none">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </article>
                </div>

                {/* Sidebar (1/3 width) */}
                <aside className="mt-12 lg:mt-0">
                    <div className="sticky top-8">
                        <Sidebar latest={latest} categories={[]} tags={[]} />
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default PostDetailPage;
