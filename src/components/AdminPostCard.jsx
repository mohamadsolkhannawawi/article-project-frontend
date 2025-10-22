import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Edit } from "lucide-react";

// This function formats the date
const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

function AdminPostCard({ post }) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
            <Link to={`/admin/posts/edit/${post.ID}`}>
                <img
                    src={
                        post.featured_image_url ||
                        "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={post.title}
                    className="w-full h-60 object-cover" // Further increased image height
                />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
                <Link to={`/admin/posts/edit/${post.ID}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-200 mb-2 line-clamp-2">
                        {post.title}
                    </h3>
                </Link>
                <div className="flex items-center text-sm text-gray-500 mt-auto pt-2">
                    <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.CreatedAt)}
                    </span>
                    <Link
                        to={`/admin/posts/edit/${post.ID}`}
                        className="ml-auto inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                    >
                        <Edit size={14} className="mr-1" /> Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminPostCard;
