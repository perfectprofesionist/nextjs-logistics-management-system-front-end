// lib/axiosInstance.ts
import { tokenStorage } from "../utils/tokenStorage";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
// const ADDON_URL = process.env.NEXT_PUBLIC_API_ADDON_URL || '/'

// Public Axios instance — no auth required
const publicAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Private Axios instance — auth required
const privateAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Send cookies if your backend uses them for auth
});

// Attach token from cookie or localStorage/sessionStorage in request
privateAxios.interceptors.request.use(
  (config) => {
    let token = Cookies.get("access_token"); // first try cookie

    // fallback to localStorage/sessionStorage if needed (client-side only)
    if (!token && typeof window !== "undefined") {
      token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token") ||
        "";
    }

    if (token && config.headers) {
      // Use your preferred header name:
      // config.headers.Authorization = `Bearer ${token}`;
      // config.headers["X-Auth-Bearer-Token"] = token;
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
// privateAxios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     if (
//       (error.response?.status === 401 || error.response?.status === 500) &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       tokenStorage.clearTokens();
//       window.location.href = "/admin/login"; // Redirect to auth/login
//       return Promise.reject(error);
//     }

//     // Handle invalid token message on 500 error as well
//     else if (
//       error.response?.status === 500 &&
//       error.response?.data &&
//       typeof error.response.data === "string" &&
//       error.response.data.toLowerCase().includes("invalid token")
//     ) {
//       tokenStorage.clearTokens();
//       window.location.href = "/admin/login";
//       return Promise.reject(error);
//     }

//     return Promise.reject(error);
//   }
// );

// CRUD helper methods for public/private
const api = {
  public: {
    getAll: (endpoint: string, params = {}) =>
      publicAxios.get(endpoint, { params }),
    getOne: (endpoint: string, params = {}) =>
      publicAxios.get(endpoint, { params }),
    register: (endpoint: string, params = {}) =>
      publicAxios.post(endpoint, params),
    create: (endpoint: string, data = {}) => publicAxios.post(endpoint, data),
    update: (endpoint: string, data = {}) => publicAxios.put(endpoint, data),
    delete: (endpoint: string, data = {}) =>
      publicAxios.delete(endpoint, { data }),
  },

  private: {
    getAll: (endpoint: string, params = {}) =>
      privateAxios.get(endpoint, { params }),
    getOne: (endpoint: string, params = {}) =>
      privateAxios.get(endpoint, { params }),
    post: (endpoint: string, params = {}) =>
      privateAxios.post(endpoint, params),
    create: (endpoint: string, data = {}) => privateAxios.post(endpoint, data),
    update: (endpoint: string, data = {}) => privateAxios.put(endpoint, data),
    delete: (endpoint: string, data = {}) =>
      privateAxios.delete(endpoint, { data }),
  },
};

export { publicAxios, privateAxios, api };
