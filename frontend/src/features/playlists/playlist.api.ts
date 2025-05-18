import axiosClient from '../config/axiosClient';
import type { PlaylistPayload } from './playlist.types';


const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/playlists`;

export const playlistAPI = {
  fetchPlaylists: () => axiosClient.get(API_BASE),
  createPlaylist: (data: PlaylistPayload) => axiosClient.post(API_BASE, data),
  updatePlaylist: (id: string, data: Partial<PlaylistPayload>) => axiosClient.put(`${API_BASE}/${id}`, data),
  deletePlaylist: (id: string) => axiosClient.delete(`${API_BASE}/${id}`),
  getPlaylistById: (id: string) => axiosClient.get(`${API_BASE}/${id}`),
};


