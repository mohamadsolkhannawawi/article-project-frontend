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

// Function to register a new user (public)
export const registerUser = async (fullName, email, password) => {
    try {
        const response = await api.post("/register", {
            full_name: fullName,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Function to get posts for the admin dashboard
export const getAdminPosts = async (status, limit = 10, offset = 0) => {
    try {
        // We don't need to add the token here, the interceptor does it for us!
        const response = await api.get("/admin/posts", {
            params: { status, limit, offset }, // e.g., /api/admin/posts?status=publish
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get all public, published posts (for the homepage)
export const getPosts = async (limit = 10, offset = 0) => {
    try {
        // This calls the public GET /api/posts endpoint
        const response = await api.get("/posts", {
            params: {
                limit,
                offset,
            },
        });
        return response.data; // Returns { status, message, data: [posts], meta: {...} }
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

// Function to get a single post by its ID (this is a public endpoint)
export const getPostByID = async (id) => {
    try {
        const response = await api.get(`/posts/${id}`);
        return response.data; // Returns { status, message, data: { post } }
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get published posts by authenticated user (for admin dashboard)
export const getMyPublishedPosts = async (limit = 10, offset = 0) => {
    try {
        // The interceptor will add the token
        const response = await api.get("/posts/my", {
            params: {
                published: true,
                limit,
                offset,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get all posts by authenticated user with optional status filter (for admin all posts page)
export const getMyAllPosts = async (limit = 10, offset = 0, status = null) => {
    try {
        // The interceptor will add the token
        const params = {
            limit,
            offset,
        };

        // Add status parameter if provided
        if (status) {
            params.status = status;
        }

        const response = await api.get("/posts/my", {
            params,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to update an existing post
export const updatePost = async (id, postData) => {
    try {
        // The interceptor will add the token
        const response = await api.put(`/posts/${id}`, postData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export default api;
