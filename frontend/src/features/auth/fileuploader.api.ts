import axiosClient from '../config/axiosClient';


const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/fileuploader`;

export const fileUploaderAPI = {
  uploadFile: (data: FormData) => axiosClient.post(`${API_BASE}/upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
}










