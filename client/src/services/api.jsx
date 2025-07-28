// src/services/api.js
import axios from 'axios';

// Create axios instance with Vite environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data?.message || 'An error occurred';

      switch (status) {
      
        case 401:
          localStorage.removeItem('authToken');
          console.error('Unauthorized access:', errorMessage);
          break;
        case 403:
          console.error('Forbidden access:', errorMessage);
          break;
        case 404:
          console.error('Resource not found:', errorMessage);
          break;
        case 500:
          console.error('Server error:', errorMessage);
          break;
        default:
          console.error(`Error ${status}:`, errorMessage);
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
const API = {
  // Authentication
  login: (credentials) => api.post('/accounts/login', credentials),
  register: (userData) => api.post('/accounts/register', userData),
  refreshToken: () => api.post('/accounts/refresh-token'),
  logout: () => api.post('/accounts/logout'),

  // Content Management
  getArticles: (params) => api.get('/articles', { params }),
  getArticleById: (id) => api.get(`/articles/${id}`),
  createArticle: (article) => api.post('/articles', article),
  updateArticle: (id, article) => api.put(`/articles/${id}`, article),
  deleteArticle: (id) => api.delete(`/articles/${id}`),

  // Podcasts
  getPodcasts: () => api.get('/podcasts'),
  getPodcastById: (id) => api.get(`/podcasts/${id}`),
  createPodcast: (podcast) => api.post('/podcasts', podcast, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),

  // User Management
  getUsers: ()=> api.get('/accounts/all'),
  getUserProfile: (id) => api.get(`/accounts/${id}`),
  updateUserById: (id, userData) => api.put(`/accounts/admin/udate/${id}`, userData),
  updateUser: (id, userData) => api.put(`/accounts/${id}`, userData),
  deleteUser: (id) => api.delete(`/accounts/${id}`),
  changeAccountPassword: (credentials) => api.post('/accounts/change/password', credentials),

  // Analytics
  getMetrics: (params) => api.get('/usage/metrics', { params }),

  // embedded Url on get
  get: (url) =>api.get(url),

};

export default API;