import axios from "axios";

// Create an Axios instance with a base URL.
// This means you don't have to type http://localhost:3000/api every time.
const api = axios.create({
    baseURL: "http://localhost:3000/api", // Your backend API URL
});

// Function to handle user login
export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", {
            email,
            password,
        });
        // Return the full response so we can access data, headers, etc.
        return response;
    } catch (error) {
        // Axios wraps the error, so we throw the response data for easier handling
        throw error.response.data;
    }
};

export default api;
