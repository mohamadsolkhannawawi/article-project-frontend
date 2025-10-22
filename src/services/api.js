import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

// THIS IS THE INTERCEPTOR
// It runs before every request is sent
api.interceptors.request.use(
    (config) => {
        // Get the token from local storage
        const token = localStorage.getItem("token");
        if (token) {
            // If the token exists, add it to the Authorization header
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to handle user login
export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get posts for the admin dashboard
export const getAdminPosts = async (status) => {
    try {
        // We don't need to add the token here, the interceptor does it for us!
        const response = await api.get("/admin/posts", {
            params: { status }, // e.g., /api/admin/posts?status=publish
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to delete (thrash) a post
export const deletePost = async (id) => {
    try {
        // The interceptor will add the token
        const response = await api.delete(`/posts/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to upload an image file
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file); // 'image' must match the key in the backend handler

    try {
        const response = await api.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // Returns { status, message, data: { url } }
    } catch (error) {
        throw error.response.data;
    }
};

// Function to create a new post
export const createPost = async (postData) => {
    try {
        // postData should be an object: { title, content, category, status, tags, featured_image_url }
        const response = await api.post("/posts", postData);
        return response.data; // Returns the new post object
    } catch (error) {
        throw error.response.data;
    }
};

export default api;
