import axios, { type AxiosRequestConfig } from "axios";
import { getCSRFToken } from "./csrf";
import GLOBAL_URLS from "./global_urls";
import { toast } from "react-toastify";

export const baseURL = import.meta.env.VITE_API_URL || "";

enum Token {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

const api = axios.create({ baseURL });

/**
 * Attach headers before request is sent
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(Token.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const csrfToken = getCSRFToken();
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  config.headers["Content-Type"] = "application/json";
  return config;
});

/**
 * Wait until the user is online again
 */
const waitForOnline = (): Promise<void> =>
  new Promise((resolve) => {
    if (navigator.onLine) return resolve();
    window.addEventListener("online", () => resolve(), { once: true });
  });

/**
 * Retry queue and refresh token logic
 */
let isRefreshing = false;
let failedQueue: Array<() => void> = [];

/**
 * Retry a request up to 3 times with online check
 */
const retryWithLimit = async (requestConfig: AxiosRequestConfig<any>, retries = 3) => {
  let attempts = 0;
  while (attempts < retries) {
    try {
      return await api(requestConfig);
    } catch (err) {
      if (!navigator.onLine) {
        toast.warn("You are offline. Waiting for connection...");
        await waitForOnline();
        toast.success("Back online. Retrying...");
      }
      attempts++;
      if (attempts >= retries) throw err;
    }
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Network error (no response)
    if (!error.response) {
      toast.error("Network error. Please check your internet connection.");
      await waitForOnline();
      toast.success("Back online. Retrying...");
      return retryWithLimit(originalRequest);
    }

    // Unauthorized (token expired)
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !GLOBAL_URLS.includes(window.location.pathname)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push(() => api(originalRequest).then(resolve).catch(reject));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem(Token.REFRESH_TOKEN);
        if (!refreshToken) throw new Error("No refresh token");

        const response = await axios.post(`${baseURL}/Auth/RefreshToken`, {
          Token: localStorage.getItem(Token.ACCESS_TOKEN),
          RefreshToken: refreshToken,
        });

        const { token, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem(Token.ACCESS_TOKEN, token);
        localStorage.setItem(Token.REFRESH_TOKEN, newRefreshToken);

        failedQueue.forEach((cb) => cb());
        failedQueue = [];

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem(Token.ACCESS_TOKEN);
        localStorage.removeItem(Token.REFRESH_TOKEN);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Server error
    if (error.response.status === 500) {
      toast.error("Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default api;
