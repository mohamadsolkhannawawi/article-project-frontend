import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage, createPost } from "../services/api";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Share, Save } from "lucide-react";

function AddNewPostPage() {
    const [title, setTitle] = useState("");

    // 'content' state will now be managed by SimpleMDE
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

    const onContentChange = (value) => {
        setContent(value);
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
            navigate("/admin/posts");
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Tulis Cerita, Lewat Kata, dan Bagikan Maknanya
            </h1>

            {error && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                    role="alert"
                >
                    {error}
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Title */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-1"
                        htmlFor="title"
                    >
                        Judul Cerita
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                        placeholder="Enter post title"
                    />
                </div>

                {/* Content (Markdown Editor) */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-1"
                        htmlFor="content"
                    >
                        Isi Cerita
                    </label>
                    <SimpleMDE
                        id="content"
                        value={content}
                        onChange={onContentChange}
                        options={{
                            spellChecker: false,
                            placeholder: "Write your post content here...",
                        }}
                    />
                </div>

                {/* Featured Image */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-1"
                        htmlFor="image"
                    >
                        Ilustrasi Cerita
                    </label>
                    <input
                        id="image"
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-700
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-purple-50 file:text-purple-700
                            hover:file:bg-purple-100"
                    />
                </div>
                {uploading && (
                    <p className="text-blue-500 text-sm mb-4">
                        Mengunggah Ilustrasi...
                    </p>
                )}

                {/* Category */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-1"
                        htmlFor="category"
                    >
                        Kategori Cerita
                    </label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                        placeholder="e.g., Technology, Lifestyle"
                    />
                </div>

                {/* Tags */}
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-1"
                        htmlFor="tags"
                    >
                        Tags Cerita (pisahkan dengan koma)
                    </label>
                    <input
                        id="tags"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                        placeholder="e.g., react, javascript, frontend"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => handleSubmit("publish")}
                        disabled={loading || uploading}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Share size={18} />{" "}
                        {loading ? "Mengunggah Cerita..." : "Bagikan Makna"}
                    </button>
                    <button
                        onClick={() => handleSubmit("draft")}
                        disabled={loading || uploading}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={18} />{" "}
                        {loading ? "Simpan Cerita..." : "Draft Cerita"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddNewPostPage;
