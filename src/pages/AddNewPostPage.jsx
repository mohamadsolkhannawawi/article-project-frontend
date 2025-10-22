import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage, createPost } from "../services/api";

function AddNewPostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState(""); // Simple comma-separated string for now
    const [imageFile, setImageFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (status) => {
        setLoading(true);
        setError("");

        // --- Validation (Simple) ---
        if (!title || !content || !category) {
            setError("Title, Content, and Category are required.");
            setLoading(false);
            return;
        }

        let featuredImageUrl = "";

        // --- Step 1: Upload Image if one is selected ---
        if (imageFile) {
            setUploading(true);
            try {
                const uploadResponse = await uploadImage(imageFile);
                featuredImageUrl = uploadResponse.data.url;
            } catch (err) {
                setError(
                    err.message || "Image upload failed. Please try again."
                );
                setLoading(false);
                setUploading(false);
                return;
            }
            setUploading(false);
        }

        // --- Step 2: Prepare Post Data ---
        const postData = {
            title,
            content,
            category,
            status: status, // 'publish' or 'draft'
            tags: tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag), // Convert string to array
            featured_image_url: featuredImageUrl,
        };

        // --- Step 3: Create Post ---
        try {
            await createPost(postData);
            // On success, navigate back to the main posts list
            navigate("/");
        } catch (err) {
            // Handle validation errors from the backend
            if (err.error) {
                setError(`Validation Failed: ${err.error}`);
            } else {
                setError(err.message || "Failed to create post.");
            }
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Add New Post</h1>

            {error && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                    role="alert"
                >
                    {error}
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow">
                {/* Title */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Your Post Title"
                    />
                </div>

                {/* Content (simple textarea for now) */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="content"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        rows="10"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Write your post content here (Markdown supported)..."
                    />
                </div>

                {/* Featured Image */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="image"
                    >
                        Featured Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        onChange={handleFileChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                {uploading && (
                    <p className="text-blue-500">Uploading image...</p>
                )}

                {/* Category */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="e.g., Technology"
                    />
                </div>

                {/* Tags */}
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tags"
                    >
                        Tags (comma-separated)
                    </label>
                    <input
                        id="tags"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="e.g., react, go, tutorial"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => handleSubmit("publish")}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                    >
                        {loading ? "Saving..." : "Publish"}
                    </button>
                    <button
                        onClick={() => handleSubmit("draft")}
                        disabled={loading}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                    >
                        {loading ? "Saving..." : "Save Draft"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddNewPostPage;
