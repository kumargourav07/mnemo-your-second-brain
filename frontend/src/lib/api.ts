import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // Debug: log when attaching Authorization header (do not log full token in production)
    if (token) {
      try {
        const short = token.length > 8 ? `${token.slice(0, 6)}...${token.slice(-2)}` : token;
        console.debug("api: attaching Authorization header", { tokenPreview: short });
      } catch (e) {
        console.debug("api: attaching Authorization header");
      }
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.debug("api: no token found — request will be unauthenticated", { url: config.url });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token is invalid or expired — remove token and notify app to navigate
        localStorage.removeItem("token");
        if (typeof window !== "undefined") {
          // Avoid dispatching when already on the auth page to prevent loops
          if (window.location.pathname !== "/auth") {
            window.dispatchEvent(new Event("unauthorized"));
          }
        }
      }
    return Promise.reject(error);
  }
);

export default api;
