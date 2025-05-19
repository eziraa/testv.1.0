import axiosClient from '../config/axiosClient';
import type { SongPayload } from './song.types';


const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/songs`;

export const songAPI = {
  fetchSongs: (params?:string) => {
    const searchParams = new URLSearchParams(params);
    searchParams.forEach((value, key) => {
      if (!value) {
        searchParams.delete(key);
      }
    });
    
    const url = params ? `${API_BASE}?${searchParams.toString()}` : API_BASE;
    return axiosClient.get(url);
  },
  createSong: (data: SongPayload) => {
    for (const key in data) {
      const typedKey = key as keyof SongPayload;
      if (!data[typedKey]) {
        delete data[typedKey];
      }
    }
    return axiosClient.post(API_BASE, data);
  },
  updateSong: (id: string, data: Partial<SongPayload>) => {
    for (const key in data) {
      const typedKey = key as keyof SongPayload;
      if (!data[typedKey]) {
        delete data[typedKey];
      }
    }
    return axiosClient.put(`${API_BASE}/${id}`, data);
  },
  deleteSong: (id: string) => axiosClient.delete(`${API_BASE}/${id}`),
  getSongById: (id: string) => axiosClient.get(`${API_BASE}/${id}`),
  favoriteSong: (songId: string) => axiosClient.patch(`${API_BASE}/${songId}/favorite`)
};


