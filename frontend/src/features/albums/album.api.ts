import axiosClient from '../config/axiosClient';
import type { AlbumPayload } from './album.types';


const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/albums`;

export const albumAPI = {
  fetchAlbums: () => axiosClient.get(API_BASE),
  createAlbum: (data: AlbumPayload) => axiosClient.post(API_BASE, data),
  updateAlbum: (id: string, data: Partial<AlbumPayload>) => axiosClient.put(`${API_BASE}/${id}`, data),
  deleteAlbum: (id: string) => axiosClient.delete(`${API_BASE}/${id}`),
  getAlbumById: (id: string) => axiosClient.get(`${API_BASE}/${id}`),
};


