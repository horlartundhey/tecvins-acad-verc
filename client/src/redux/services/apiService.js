import axios from 'axios';

// Global flag to prevent API calls after auth failure
let isAuthenticating = false;

const BASE_URL = import.meta.env.PROD 
    ? '/api'  // In production, use relative path
    : 'http://localhost:5000/api';

const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        // Optional: explicitly tell the browser and server to not cache
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    },
    // Ensure proper handling of FormData
    transformRequest: [function (data, headers) {
        if (data instanceof FormData) {
            // Remove Content-Type so Axios/browser sets it with boundary
            delete headers['Content-Type'];
            return data;
        }
        // For regular JSON data
        if (data) {
            headers['Content-Type'] = 'application/json';
            return JSON.stringify(data);
        }
        return data;
    }],    validateStatus: function (status) {
        return status >= 200 && status < 300;
    },
    timeout: 10000, // 10 second timeout
    timeoutErrorMessage: 'Request timed out. Please try again.'
});

// Request interceptor for adding auth token
apiService.interceptors.request.use(
    (config) => {
        // Check if token exists first
        const token = localStorage.getItem('token');
        
        // If no token for admin/protected routes, immediately block the request
        if (!token && (config.url.includes('/admin') || config.url.includes('/contact'))) {
            console.log('No token found for protected route - blocking request and redirecting');
            isAuthenticating = true;
            setTimeout(() => {
                window.location.replace('/login');
            }, 0);
            return Promise.reject(new Error('No authentication token'));
        }
        
        // Block all requests if authentication failed
        if (isAuthenticating) {
            return Promise.reject(new Error('Authentication in progress - blocking request'));
        }
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
apiService.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401) {
            console.log('401 Unauthorized - COMPLETELY STOPPING ALL API CALLS');
            
            // Set flag to block all future API calls
            isAuthenticating = true;
            
            // Clear all auth-related data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Completely disable the axios instance
            apiService.defaults.timeout = 1; // Set to 1ms to make all requests fail fast
            
            // Override all axios methods to reject immediately
            apiService.get = () => Promise.reject(new Error('API disabled due to authentication failure'));
            apiService.post = () => Promise.reject(new Error('API disabled due to authentication failure'));
            apiService.put = () => Promise.reject(new Error('API disabled due to authentication failure'));
            apiService.delete = () => Promise.reject(new Error('API disabled due to authentication failure'));
            
            // Immediate redirect
            setTimeout(() => {
                window.location.replace('/login');
            }, 0);
            
            // Return a rejected promise to stop the request chain
            return Promise.reject(new Error('Authentication failed - API disabled'));
        }

        // Handle other HTTP errors
        if (error.response) {
            return Promise.reject(error.response.data || error.response);
        }

        // Handle network errors
        return Promise.reject(error);
    }
);

export default apiService;
