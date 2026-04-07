import axios from "axios";

// Your Spring Boot backend URL - Updated to port 8084
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8085/api";
console.log('🔧 Connecting to Spring Boot Backend:', BASE_URL);
console.log('🔧 Environment:', process.env.NODE_ENV);

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log requests in development only
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        hasToken: !!token,
        data: config.data
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    // Log responses in development only
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Response:', {
        status: response.status,
        url: response.config.url,
        method: response.config.method?.toUpperCase(),
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('❌ Spring Boot Error:', {
        status: error.response.status,
        url: error.config?.url,
        method: error.config?.method,
        data: error.response.data,
        message: error.response.data?.message || error.message
      });
      
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - token expired or invalid
          console.log('🔐 Token expired or invalid. Redirecting to login...');
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          // Only redirect if not already on login page
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login?session=expired';
          }
          break;
          
        case 403:
          // Forbidden - insufficient permissions
          console.log('🔒 Insufficient permissions');
          // You could redirect to unauthorized page
          // window.location.href = '/unauthorized';
          break;
          
        case 404:
          // Not found
          console.log('🔍 Resource not found:', error.config?.url);
          break;
          
        case 500:
          // Server error
          console.log('💥 Server error. Please try again later.');
          break;
          
        default:
          // Other errors
          break;
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ No response from server. Make sure backend is running on port 8084');
      console.error('Request details:', {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      });
      
      // You could show a toast notification here
      // toast.error('Cannot connect to server. Please check if backend is running.');
    } else {
      // Something happened in setting up the request
      console.error('❌ Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// =======================
// HELPER FUNCTIONS
// =======================

/**
 * Check if backend is reachable
 */
export const checkBackendHealth = async () => {
  try {
    const response = await API.get('/health', { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    console.error('❌ Backend health check failed:', error.message);
    return false;
  }
};

/**
 * Get auth token from localStorage
 */
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  
  try {
    // Check if token is expired (if you have JWT expiry)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expiry;
  } catch {
    return true; // If can't decode, assume it's valid
  }
};

/**
 * Set auth token
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

/**
 * Get user from localStorage
 */
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/**
 * Set user in localStorage
 */
export const setUser = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
};

/**
 * Clear all auth data
 */
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export default API;