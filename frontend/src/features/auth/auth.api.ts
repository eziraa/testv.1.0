import axiosClient from '../config/axiosClient';
import type { LoginPayload, SignupPayload } from './auth.types';


const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export const authAPI = {
  signup: (data: SignupPayload) => axiosClient.post(`${API_BASE}/signup`, data),
  login: (data: LoginPayload) => axiosClient.post(`${API_BASE}/login`, data),
  logout: () => axiosClient.post(`${API_BASE}/logout`),
  refreshToken: () => axiosClient.post(`${API_BASE}/refresh-token`),
  getMe: () => axiosClient.get(`${API_BASE}/me`),
}



