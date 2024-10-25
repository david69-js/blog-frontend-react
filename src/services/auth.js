// src/services/auth.js
import api from './api';

export const loginUser = async (credentials) => {

  try {
    const response = await api.post('/login', credentials);
    return response.data; // Aquí recibirás el token u otra información relevante
  } catch (error) {
    throw error.response?.data || 'Error al iniciar sesión';
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al registrarse';
  }
};
