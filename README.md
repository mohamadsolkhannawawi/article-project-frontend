# Article Project Frontend

## Project Description

This is the frontend for the Article Project, a modern platform for creating and managing articles. It provides a complete user experience for reading articles and a management panel for administrators to write, edit, and manage content.

## Tech Stack

- **Framework:** React (Vite)
- **Language:** JavaScript (JSX)
- **Styling:** Tailwind CSS
- **API Communication:** Axios

## Project Structure

```
frontend/
├── public/               # Public assets not processed by Vite
└── src/
    ├── assets/           # Static assets like images and SVGs
    ├── components/       # Reusable UI components (e.g., Navbar, PostCard)
    ├── context/          # Global state management (e.g., AuthContext)
    ├── layouts/          # Page layout components (Admin, Public)
    ├── pages/            # Components for each application page (e.g., Home, Login, Dashboard)
    ├── routes/           # Routing configuration (e.g., ProtectedRoute)
    ├── services/         # API communication layer (e.g., api.js)
    ├── App.jsx           # Main application component and routing setup
    ├── main.jsx          # Entry point for the React application
    └── index.css         # Global CSS styles
```

## Installation and Setup Guide

### 1. Prerequisites
Ensure the following software is installed on your machine:
- Node.js & NPM

### 2. Initial Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/mohamadsolkhannawawi/article-project-frontend.git
   ```
2. Navigate into the project directory:
   ```bash
   cd article-project-frontend
   ```

### 3. Frontend Configuration
1. Install JavaScript dependencies:
   ```bash
   npm install
   ```
2. Run the frontend development server:
   ```bash
   npm run dev
   ```

### 4. Accessing the Application
- Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).
