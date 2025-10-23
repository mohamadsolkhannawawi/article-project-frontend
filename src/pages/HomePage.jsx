import React, { useState, useEffect } from "react";
import { getPosts } from "../services/api"; // We use getPosts (public), NOT getAdminPosts
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { ArrowDown, ArrowRight } from "lucide-react";

const LIMIT = 9;

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError("");
            try {
                // getPosts will only return 'published' posts
                const response = await getPosts(LIMIT, offset);
                setPosts(response.data || []);
                setTotal(response.meta?.total || 0);
            } catch (err) {
                setError(err.message || "Failed to fetch posts.");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [offset]); // Re-run when offset changes

    // Handler for when a page number is clicked
    const handlePageChange = (newOffset) => {
        setOffset(newOffset);
    };

    return (
        <div>
            {/* Hero Section - KataGenzi Brand Identity (Full-width, soft gradient) */}
            <div className="overflow-hidden">
                {" "}
                {/* The gradient now fades to transparent, blending into the gray background from PublicLayout */}
                <div className="relative bg-gradient-to-b from-purple-100 via-purple-50 to-transparent text-gray-900 pt-24 pb-32 px-6 md:px-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-8xl md:text-6xl font-bold leading-tight tracking-wide text-gray-900">
                            KataGenzi: Segalanya tentang Kata, Rasa, dan Makna
                        </h1>
                        <p className="mt-6 text-lg md:text-xl font-light leading-relaxed text-gray-700">
                            Ruang sunyi yang bercerita, tempat setiap kata menemukan maknanya
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#articles" // Link to the articles section below
                                className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-lg"
                            >
                                Temukan Kata
                                <ArrowDown size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* This div now only provides vertical spacing, background comes from PublicLayout */}
            <div className="py-6">
                <h2
                    id="articles"
                    className="text-4xl font-bold mb-8 scroll-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    Kata Kita, Tentang Rasa
                </h2>

                {loading && <p className="text-center">Memuat semua kata...</p>}
                {error && (
                    <p className="text-center text-red-600">Error: {error}</p>
                )}

                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostCard key={post.ID} post={post} />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500">
                                    Sayangnya, belum ada kata yang diolah dengan rasa.
                                </p>
                            )}
                        </div>

                        {total > LIMIT && (
                            <Pagination
                                total={total}
                                limit={LIMIT}
                                offset={offset}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default HomePage;
