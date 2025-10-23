import React, { useState, useEffect } from "react";
import { getMyPublishedPosts } from "../services/api"; // Use getMyPublishedPosts for user's articles
import AdminPostCard from "../components/AdminPostCard"; // Use the new, smaller card
import Pagination from "../components/Pagination"; // Reuse Pagination
import { FileText } from "lucide-react"; // Icon for the section title

const LIMIT = 3; // Render only 3 posts per page

function AdminDashboardPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchMyPublishedPosts = async () => {
            setLoading(true);
            setError("");
            try {
                // Fetch only published posts by the authenticated user
                const response = await getMyPublishedPosts(LIMIT, offset);
                setPosts(response.data || []);
                setTotal(response.meta?.total || 0);
            } catch (err) {
                setError(
                    err.message || "Failed to fetch your published posts."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchMyPublishedPosts();
    }, [offset]);

    const handlePageChange = (newOffset) => {
        setOffset(newOffset);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText size={28} className="text-purple-600" /> Semua Publikasi Ceritamu
            </h1>

            {loading && (
                <p className="text-gray-700">
                    Memuat cerita yang kamu publish...
                </p>
            )}
            {error && <p className="text-red-600">Error: {error}</p>}

            {!loading && !error && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <AdminPostCard key={post.ID} post={post} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-500">
                                    Kamu belum mempublikasikan cerita apapun, mari mulai menulis, melalui kata, dengan rasa, dan bagikan maknanya.
                                </p>
                            </div>
                        )}
                    </div>

                    <Pagination
                        total={total}
                        limit={LIMIT}
                        offset={offset}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

export default AdminDashboardPage;
