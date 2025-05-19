import axiosClient from '../config/axiosClient';
import type { ArtistPayload } from './artist.types';


const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/artists`;

export const artistAPI = {
  fetchArtists:  (params?:string) => {
    const searchParams = new URLSearchParams(params);
    searchParams.forEach((value, key) => {
      if (!value) {
        searchParams.delete(key);
      }
    });
    
    const url = params ? `${API_BASE}?${searchParams.toString()}` : API_BASE;
    return axiosClient.get(url)
  },
  createArtist: (data: ArtistPayload) => axiosClient.post(API_BASE, data),
  updateArtist: (id: string, data: Partial<ArtistPayload>) => axiosClient.put(`${API_BASE}/${id}`, data),
  deleteArtist: (id: string) => axiosClient.delete(`${API_BASE}/${id}`),
  getArtistById: (id: string) => axiosClient.get(`${API_BASE}/${id}`),
};


