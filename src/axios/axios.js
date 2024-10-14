//axios.js

import axios from 'axios';

const api = axios.create({
  baseURL: '', // Altere para a URL do backend.
  timeout: 10000, 
});

// adiciona um interceptor para incluir o token em todas as requisições.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtém o token do localStorage.
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Inclui o token no cabeçalho.
  }
  return config;
});

export default api;
