import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostByID, updatePost, uploadImage } from "../services/api";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Save, Upload } from "lucide-react"; // Import Lucide icons

function EditPostPage() {
    // Get the 'id' from the URL (e.g., /posts/edit/abc-123)
    const { id } = useParams();
    const navigate = useNavigate();

    // Form state
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState("");

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

    // --- Step 1: Fetch Post Data on Component Load ---
    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const response = await getPostByID(id);
                const post = response.data;
                // Populate the form with the fetched data
                setTitle(post.title);
                setContent(post.content);
                setCategory(post.category);
                setExistingImageUrl(post.featured_image_url || "");
                // Convert the tags array back into a comma-separated string for the input
                setTags(
                    post.tags ? post.tags.map((tag) => tag.name).join(", ") : ""
                );
            } catch (err) {
                setError(err.message || "Failed to fetch post data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]); // Re-run if the ID in the URL changes

    const onContentChange = (value) => {
        setContent(value);
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
        setExistingImageUrl(""); // Clear the old image preview if a new one is selected
    };

    // --- Step 2: Handle Form Submission ---
    const handleSubmit = async (status) => {
        setLoading(true);
        setError("");

        let featuredImageUrl = existingImageUrl; // Start with the old image URL

        // --- 2a: Upload Image if a new one is selected ---
        if (imageFile) {
            setUploading(true);
            try {
                const uploadResponse = await uploadImage(imageFile);
                featuredImageUrl = uploadResponse.data.url;
            } catch (err) {
                setError(err.message || "Image upload failed.");
                setLoading(false);
                setUploading(false);
                return;
            }
            setUploading(false);
        }

        // --- 2b: Prepare Post Data ---
        const postData = {
            title,
            content,
            category,
            status: status,
            tags: tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag),
            featured_image_url: featuredImageUrl,
        };

        // --- 2c: Call Update API ---
        try {
            await updatePost(id, postData);
            navigate("/admin/posts"); // Go back to the posts list on success
        } catch (err) {
            setError(err.message || "Failed to update post.");
            setLoading(false);
        }
    };

    // Show loading skeleton while fetching
    if (loading && !title) {
        return <div>Loading post data...</div>;
    }
    // Use consistent styling for error messages
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Post</h1>

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
                        Title
                    </label>
                    <input
                        id="title"
                        type="text" // Apply consistent form input styling
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                    />
                </div>

                {/* Content (Markdown Editor) */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-1"
                        htmlFor="content"
                    >
                        Content
                    </label>
                    <SimpleMDE
                        id="content"
                        value={content}
                        onChange={onContentChange}
                        options={{
                            // Add placeholder for better UX
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
                        Featured Image
                    </label>
                    <input
                        id="image"
                        type="file" // Apply consistent file input styling
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-700
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-purple-50 file:text-purple-700
                            hover:file:bg-purple-100"
                    />
                    {/* Show the existing image */}
                    {existingImageUrl && (
                        <img
                            src={existingImageUrl}
                            alt="Current featured"
                            className="w-32 h-32 object-cover mt-2 rounded-md"
                        />
                    )}
                </div>
                {uploading && (
                    <p className="text-blue-500 text-sm mb-4">
                        Uploading new image...
                    </p>
                )}

                {/* Category */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-1"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <input
                        id="category"
                        type="text" // Apply consistent form input styling
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                    />
                </div>

                {/* Tags */}
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-1"
                        htmlFor="tags"
                    >
                        Tags (comma-separated)
                    </label>
                    <input
                        id="tags"
                        type="text" // Apply consistent form input styling
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => handleSubmit("publish")}
                        disabled={loading || uploading}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Upload size={18} />{" "}
                        {loading ? "Updating..." : "Update & Publish"}
                    </button>
                    <button
                        onClick={() => handleSubmit("draft")}
                        disabled={loading || uploading}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={18} />{" "}
                        {loading ? "Updating..." : "Update Draft"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditPostPage;
