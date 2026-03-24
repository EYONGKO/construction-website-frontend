import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://construction-website-backend-m3aw.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (project) => api.post('/projects', project),
  update: (id, project) => api.put(`/projects/${id}`, project),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const serviceAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
  create: (service) => api.post('/services', service),
  update: (id, service) => api.put(`/services/${id}`, service),
  delete: (id) => api.delete(`/services/${id}`),
};

export const contactAPI = {
  create: (contactMessage) => api.post('/contact', contactMessage),
  getAll: () => api.get('/contact'),
};

export const quoteAPI = {
  create: (quoteRequest) => api.post('/quotes', quoteRequest),
  getAll: () => api.get('/quotes'),
};

export const siteContentAPI = {
  get: () => api.get('/site-content'),
};

export default api;
