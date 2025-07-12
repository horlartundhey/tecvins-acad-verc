import axios from 'axios';

// Global flag to prevent API calls after auth failure
let isAuthenticating = false;

const api = axios.create({
    baseURL: 'https://tecvins-acad-verc-server.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
    }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        // Check if token exists first
        const token = localStorage.getItem('token');
        
        // If no token, immediately block the request
        if (!token) {
            console.log('No token found - blocking request and redirecting');
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
        
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle 401 Unauthorized responses
            if (error.response.status === 401) {
                console.log('401 Unauthorized - stopping all API calls and redirecting to login');
                
                // Set flag to block all future API calls
                isAuthenticating = true;
                
                localStorage.removeItem('token'); // Clear invalid token
                localStorage.removeItem('user'); // Clear user data
                
                // Use timeout to ensure redirect happens after current execution
                setTimeout(() => {
                    window.location.replace('/login');
                }, 100);
                
                return Promise.reject(new Error('Unauthorized'));
            }
            
            // Handle 403 Forbidden responses
            if (error.response.status === 403) {
                console.error('Access denied:', error.response.data.message);
            }

            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);
export default api;
