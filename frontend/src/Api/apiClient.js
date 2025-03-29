import axios from 'axios';

// Base URL for all API requests - local development only
const API_BASE_URL = 'http://localhost:3000/api/v1';

console.log('Using API URL:', API_BASE_URL);

// Create a pre-configured axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (401, 403, etc.)
    if (error.response && error.response.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// API endpoints
const endpoints = {
  // User related
  signin: '/user/signin',
  signup: '/user/signup',
  getUser: '/user/me',
  searchUsers: '/user/bulk',
  
  // Account related
  getBalance: '/account/balance',
  transfer: '/account/transfer',
  getTransactions: '/account/transactions',
};

export { apiClient, endpoints }; 