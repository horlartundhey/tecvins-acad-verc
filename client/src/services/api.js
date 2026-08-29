import axios from 'axios';
import { normalizeApiError } from '../utils/normalizeApiError';

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

// Public routes that don't require authentication.
// Requests through this instance carry the RELATIVE path in config.url (e.g.
// "/hire-requests"), not the "/api/..." form these entries used to be written
// with - that mismatch meant isPublicRoute() never matched anything, so every
// anonymous visitor submitting a public form (no token in localStorage) got
// silently rejected client-side before the request ever reached the network.
//
// Entries are method-aware because several of these paths are shared with
// admin-only endpoints: "/hire-requests", "/waitlist" and "/partners" are
// public to CREATE (POST) but their GET/PUT/PATCH/DELETE siblings are the
// admin dashboard managing those submissions and must keep requiring a
// token. "/blogs" and "/cohorts" are the other way round - public to READ.
const PUBLIC_ROUTES = [
    { method: 'post', path: '/auth/login' },
    { method: 'get', path: '/blogs' },
    { method: 'get', path: '/cohorts' },
    { method: 'post', path: '/students/apply' },
    { method: 'post', path: '/trainers/apply' },
    { method: 'post', path: '/waitlist' },
    { method: 'post', path: '/contact' },
    { method: 'post', path: '/partners' },
    { method: 'post', path: '/newsletter' },
    { method: 'post', path: '/donate' },
    { method: 'post', path: '/hire-requests' },
];

// Check if a URL+method combination is a public route
const isPublicRoute = (url, method) => {
    if (!url || !method) return false;
    const normalizedMethod = method.toLowerCase();
    return PUBLIC_ROUTES.some(route => route.method === normalizedMethod && url.includes(route.path));
};

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        // Allow public routes without token
        if (isPublicRoute(config.url, config.method)) {
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
                console.error('Access denied:', error.response.data?.message);
            }
        }

        return Promise.reject(normalizeApiError(error));
    }
);

export default api;
