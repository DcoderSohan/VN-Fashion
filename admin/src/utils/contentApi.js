import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../config/constants';

// Base URL for content APIs (using constants)
const CONTENT_BASE = '/content';

// ================= IMAGE UPLOAD =================
export const uploadImage = async (file, folder = 'content') => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', folder);
  return axiosInstance.post(API_ENDPOINTS.UPLOAD_IMAGE, formData);
};

// ================= GALLERY =================
export const galleryApi = {
  getAll: () => axiosInstance.get(API_ENDPOINTS.GALLERY),
  create: (data) => axiosInstance.post(API_ENDPOINTS.GALLERY, data),
  update: (id, data) => axiosInstance.put(`${API_ENDPOINTS.GALLERY}/${id}`, data),
  delete: (id) => axiosInstance.delete(`${API_ENDPOINTS.GALLERY}/${id}`),
};

// ================= ABOUT =================
export const aboutApi = {
  get: () => axiosInstance.get(API_ENDPOINTS.ABOUT),
  update: (data) => axiosInstance.put(API_ENDPOINTS.ABOUT, data),
};

// ================= ACHIEVEMENTS =================
export const achievementsApi = {
  getAll: () => axiosInstance.get(API_ENDPOINTS.ACHIEVEMENTS),
  create: (data) => axiosInstance.post(API_ENDPOINTS.ACHIEVEMENTS, data),
  update: (id, data) => axiosInstance.put(`${API_ENDPOINTS.ACHIEVEMENTS}/${id}`, data),
  delete: (id) => axiosInstance.delete(`${API_ENDPOINTS.ACHIEVEMENTS}/${id}`),
};

// ================= TIMELINE =================
export const timelineApi = {
  getAll: () => axiosInstance.get(API_ENDPOINTS.TIMELINE),
  create: (data) => axiosInstance.post(API_ENDPOINTS.TIMELINE, data),
  update: (id, data) => axiosInstance.put(`${API_ENDPOINTS.TIMELINE}/${id}`, data),
  delete: (id) => axiosInstance.delete(`${API_ENDPOINTS.TIMELINE}/${id}`),
};

// ================= SERVICES =================
export const servicesApi = {
  getAll: () => axiosInstance.get(API_ENDPOINTS.SERVICES),
  create: (data) => axiosInstance.post(API_ENDPOINTS.SERVICES, data),
  update: (id, data) => axiosInstance.put(`${API_ENDPOINTS.SERVICES}/${id}`, data),
  delete: (id) => axiosInstance.delete(`${API_ENDPOINTS.SERVICES}/${id}`),
};

// ================= CATEGORIES =================
export const categoriesApi = {
  getAll: () => axiosInstance.get(API_ENDPOINTS.CATEGORIES),
  create: (data) => axiosInstance.post(API_ENDPOINTS.CATEGORIES, data),
  update: (id, data) => axiosInstance.put(`${API_ENDPOINTS.CATEGORIES}/${id}`, data),
  delete: (id) => axiosInstance.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`),
};

// ================= BOOKINGS =================
export const bookingsApi = {
  getAll: () => axiosInstance.get(API_ENDPOINTS.BOOKINGS),
  create: (data) => axiosInstance.post(API_ENDPOINTS.BOOKINGS, data),
  update: (id, data) => axiosInstance.put(`${API_ENDPOINTS.BOOKINGS}/${id}`, data),
  delete: (id) => axiosInstance.delete(`${API_ENDPOINTS.BOOKINGS}/${id}`),
};

// ================= CONTACTS =================
export const contactsApi = {
  getAll: () => axiosInstance.get(API_ENDPOINTS.CONTACTS),
  create: (data) => axiosInstance.post(API_ENDPOINTS.CONTACTS, data),
  update: (id, data) => axiosInstance.put(`${API_ENDPOINTS.CONTACTS}/${id}`, data),
  delete: (id) => axiosInstance.delete(`${API_ENDPOINTS.CONTACTS}/${id}`),
};

// ================= CERTIFICATES =================
export const certificatesApi = {
  getAll: () => axiosInstance.get(API_ENDPOINTS.CERTIFICATES),
  create: (data) => axiosInstance.post(API_ENDPOINTS.CERTIFICATES, data),
  update: (id, data) => axiosInstance.put(`${API_ENDPOINTS.CERTIFICATES}/${id}`, data),
  delete: (id) => axiosInstance.delete(`${API_ENDPOINTS.CERTIFICATES}/${id}`),
};

// ================= TESTIMONIALS =================
export const testimonialsApi = {
  getAll: () => axiosInstance.get(API_ENDPOINTS.TESTIMONIALS),
  create: (data) => axiosInstance.post(API_ENDPOINTS.TESTIMONIALS, data),
  update: (id, data) => axiosInstance.put(`${API_ENDPOINTS.TESTIMONIALS}/${id}`, data),
  delete: (id) => axiosInstance.delete(`${API_ENDPOINTS.TESTIMONIALS}/${id}`),
};

// ================= SETTINGS =================
export const settingsApi = {
  get: () => axiosInstance.get(API_ENDPOINTS.SETTINGS),
  update: (data) => axiosInstance.put(API_ENDPOINTS.SETTINGS, data),
};
