import axios from 'axios';

// Global flag to prevent API calls after auth failure
let isAuthenticating = false;

// Smart API URL detection - works automatically in all environments
const getApiUrl = () => {
    const hostname = window.location.hostname;
    
    // Local development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:5000/api';
    }
    
    // Production - automatically detect
    if (hostname.includes('tecvinsonacademy.com')) {
        return 'https://tecvins-acad-verc-server.vercel.app/api';
    }
    
    // Fallback for other domains
    return '/api';
};

const api = axios.create({
    baseURL: getApiUrl(),
    headers: {
        'Content-Type': 'application/json',
    }
});

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/blogs',
    '/api/cohorts',
    '/api/students/apply',
    '/api/trainers/apply',
    '/api/waitlist',
    '/api/contact',
    '/api/partners',
    '/api/newsletter',
    '/api/donate',
    '/api/hire-requests'
];

// Check if a URL is a public route
const isPublicRoute = (url) => {
    return PUBLIC_ROUTES.some(route => url?.includes(route));
};

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        // Allow public routes without token
        if (isPublicRoute(config.url)) {
            return config;
        }
        
        // Check if token exists for protected routes
        const token = localStorage.getItem('token');
        
        // If no token for protected route, reject the request
        // BUT don't redirect - let the component handle it
        if (!token) {
            console.log('No token found for protected route:', config.url);
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
                console.log('401 Unauthorized - clearing auth data');
                
                // Only set flag and redirect if we're not already on login page
                const currentPath = window.location.pathname;
                if (!currentPath.includes('/login')) {
                    // Set flag to block all future API calls
                    isAuthenticating = true;
                    
                    localStorage.removeItem('token'); // Clear invalid token
                    localStorage.removeItem('user'); // Clear user data
                    
                    // Use timeout to ensure redirect happens after current execution
                    setTimeout(() => {
                        window.location.replace('/login');
                    }, 100);
                }
                
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
