import axios from 'axios';

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
        const token = localStorage.getItem('token');
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
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Redirect to login if token is invalid/expired
            window.location.href = '/login';
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default apiService;
