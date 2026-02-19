const config = {
    API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    PYTHON_API_URL: import.meta.env.VITE_PYTHON_API_URL || "http://localhost:8000"
};

export default config;
