import axios from "axios";
import { getCSRFToken } from "./csrf";
import GLOBAL_URLS from "./global_urls";
export const baseURL = import.meta.env.VITE_API_URL || "";


enum Token {
    ACCESS_TOKEN = "accessToken",
    REFRESH_TOKEN = "refreshToken"
}
const api = axios.create({
  baseURL,
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(Token.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      if (
        error.response.status === 401 &&
        !GLOBAL_URLS.includes(window.location.pathname)
      ) {
        localStorage.removeItem(Token.ACCESS_TOKEN);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
export default api;