import React from "react";
import { Link } from "react-router-dom";
import { Clock, Tag, Folder } from "lucide-react";

function Sidebar({ latest, categories, tags }) {
    return (
        <div className="space-y-8">
            {/* Latest Posts */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-purple-600" /> Latest Posts
                </h3>
                <ul className="space-y-3">
                    {latest.length > 0 ? (
                        latest.map((post) => (
                            <li key={post.ID}>
                                <Link
                                    to={`/posts/${post.ID}`}
                                    className="text-gray-700 hover:text-purple-600 transition-colors duration-200 block"
                                >
                                    {post.title}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No latest posts.</p>
                    )}
                </ul>
            </div>

            {/* Categories (Placeholder) */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Folder size={20} className="text-purple-600" /> Categories
                </h3>
                <ul className="space-y-2">
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <li key={index}>
                                <Link
                                    to={`/categories/${category.slug}`}
                                    className="text-gray-700 hover:text-purple-600 transition-colors duration-200 block"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No categories yet.</p>
                    )}
                </ul>
            </div>

            {/* Tags (Placeholder) */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag size={20} className="text-purple-600" /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                    {tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <Link
                                key={index}
                                to={`/tags/${tag.slug}`}
                                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200"
                            >
                                {tag.name}
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No tags yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
