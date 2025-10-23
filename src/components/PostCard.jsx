import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

// This function formats the date
const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

function PostCard({ post }) {
    return (
        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden post-card-gradient">
            {" "}
            {/* Consistent styling */}
            <Link to={`/blog/${post.ID}`}>
                <img
                    src={
                        post.featured_image_url ||
                        "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={post.title}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-6">
                {" "}
                {/* Consistent padding */}
                <Link to={`/blog/${post.ID}`}>
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-200 mb-2 line-clamp-2">
                        {post.title}
                    </h3>
                </Link>
                <div className="flex items-center text-sm text-gray-600 mb-4 space-x-3">
                    <span className="flex items-center gap-1">
                        <User size={16} className="text-purple-500" />
                        {post.author?.full_name || "Anonymous"}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="flex items-center gap-1">
                        <Calendar size={16} className="text-purple-500" />
                        {formatDate(post.CreatedAt)}
                    </span>
                </div>
                <p className="text-gray-700 text-base mb-4 line-clamp-3">
                    {post.content.substring(0, 150)}... {/* Simple excerpt */}
                </p>
                <Link // Ensure PostCard links to the public blog post detail page
                    to={`/blog/${post.ID}`}
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                >
                    Temukan Makna <ArrowRight size={16} className="ml-1" />
                </Link>
            </div>
        </div>
    );
}

export default PostCard;
