import React, { useState, useEffect } from "react";
import { getAdminPosts, deletePost } from "../services/api"; // <-- IMPORT
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const TABS = ["Published", "Draft", "Trashed"];
const LIMIT = 10;

function AllPostsPage() {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [posts, setPosts] = useState([]);

    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // This effect will run when the component mounts and when activeTab changes
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError("");
            try {
                // Convert tab name to lowercase for the API (e.g., "Published" -> "publish")
                const status = activeTab.toLowerCase();
                // Pass limit and offset to the API call
                const response = await getAdminPosts(status, LIMIT, offset);
                setPosts(response.data || []);
                setTotal(response.meta.total || 0); // Save the total count
            } catch (err) {
                setError(err.message || "Failed to fetch posts.");
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [activeTab, offset]); // Dependency array: re-run the effect when activeTab changes, or offset changes

    // Handler for when a page number is clicked
    const handlePageChange = (newOffset) => {
        setOffset(newOffset);
    };

    // Reset offset when tab changes
    useEffect(() => {
        setOffset(0);
    }, [activeTab]);

    // Handler for thrashing a post
    const handleThrash = async (postId, postTitle) => {
        // Add a confirmation dialog as a safety net
        if (
            !window.confirm(
                `Are you sure you want to thrash the post "${postTitle}"?`
            )
        ) {
            return;
        }

        try {
            await deletePost(postId);

            // On success, update the UI instantly by removing the post from state.
            // This is called an "optimistic update" and feels fast.
            setPosts((prevPosts) =>
                prevPosts.filter((post) => post.ID !== postId)
            );

            // You could also show a success notification here
        } catch (err) {
            setError(err.message || "Failed to thrash post.");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">All Posts</h1>
                <Link
                    to="/posts/new"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New
                </Link>
            </div>

            {/* Tab Navigation */}
            <div className="mb-4 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${
                                activeTab === tab
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content for the active tab */}
            <div>
                {loading && <p>Loading posts...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

                {!loading && !error && (
                    <div className="bg-white shadow rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {posts.length > 0 ? (
                                    posts.map((post) => (
                                        <tr key={post.ID}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {post.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {post.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    to={`/posts/edit/${post.ID}`}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    Edit
                                                </Link>

                                                {/* Only show the "Thrash" button if the post is NOT already trashed. We pass the post ID and title to the handler. */}
                                                {activeTab !== "Trashed" && (
                                                    <button
                                                        onClick={() =>
                                                            handleThrash(
                                                                post.ID,
                                                                post.title
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Thrash
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="px-6 py-4 text-center text-gray-500"
                                        >
                                            No posts found in {activeTab}.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination Controls */}
                {!loading && !error && total > 0 && (
                    <Pagination
                        total={total}
                        limit={LIMIT}
                        offset={offset}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}

export default AllPostsPage;
