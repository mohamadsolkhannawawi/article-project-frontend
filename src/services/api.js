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

export default api;
