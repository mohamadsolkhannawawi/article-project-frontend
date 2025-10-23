import React, { useState, useEffect } from "react";
import { getMyAllPosts, deletePost } from "../services/api"; // <-- IMPORT getMyAllPosts for user's posts
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { PencilLine, Edit, Trash2 } from "lucide-react"; // Import Lucide icons

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
        const fetchMyPosts = async () => {
            setLoading(true);
            setError("");
            try {
                // Map tab names to status values
                const statusMap = {
                    Published: "publish",
                    Draft: "draft",
                    Trashed: "trash",
                };
                const status = statusMap[activeTab];

                // Fetch posts by authenticated user with status filter
                const response = await getMyAllPosts(LIMIT, offset, status);
                setPosts(response.data || []);
                setTotal(response.meta.total || 0); // Save the total count
            } catch (err) {
                setError(err.message || "Failed to fetch your posts.");
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMyPosts();
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

            // On success, remove from current tab view
            setPosts((prevPosts) =>
                prevPosts.filter((post) => post.ID !== postId)
            );

            // Re-fetch posts from the same tab to ensure data is in sync
            setLoading(true);
            const statusMap = {
                Published: "publish",
                Draft: "draft",
                Trashed: "trash",
            };
            const status = statusMap[activeTab];
            const response = await getMyAllPosts(LIMIT, offset, status);
            setPosts(response.data || []);
            setTotal(response.meta.total || 0);
            setLoading(false);

            // You could also show a success notification here
        } catch (err) {
            setError(err.message || "Failed to thrash post.");
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Semua Cerita Milikmu</h1>
                <Link
                    to="/admin/posts/new"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
                >
                    <PencilLine size={18} />
                    Tulis Cerita
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
                                activeTab === tab // Use purple for active tab
                                    ? "border-purple-500 text-purple-600"
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
                {loading && <p className="text-gray-700">Memuat Cerita Milikmu...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

                {!loading && !error && (
                    <div className="bg-white shadow rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Judul Cerita
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kategori Cerita
                                    </th>
                                    <th className="relative px-6 py-3">
                                        <span className="sr-only">Aksi</span>
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
                                                    {post.category ||
                                                        "Uncategorized"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    to={`/admin/posts/edit/${post.ID}`}
                                                    className="text-purple-600 hover:text-purple-800 mr-4 inline-flex items-center gap-1"
                                                >
                                                    <Edit size={16} /> Edit
                                                </Link>

                                                {/* Only show the "Thrash" button if the post is NOT already trashed. We pass the post ID and title to the handler. */}
                                                {/* Use red for thrash button */}
                                                {activeTab !== "Trashed" && (
                                                    <button
                                                        onClick={() =>
                                                            handleThrash(
                                                                post.ID,
                                                                post.title
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                                                    >
                                                        <Trash2 size={16} />{" "}
                                                        Trash
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
                                            Belum ada cerita untuk ditampilkan di tab {activeTab}.
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
