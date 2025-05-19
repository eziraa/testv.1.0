import axiosClient from '../config/axiosClient';




const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/stats`;

export const statsAPI = {
  fetchStats: () => axiosClient.get(API_BASE)
}







