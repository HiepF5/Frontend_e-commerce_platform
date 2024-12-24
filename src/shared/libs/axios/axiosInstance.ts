// src/shared/libs/axiosInstance.ts
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token !== undefined && token !== null && token !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

export default axiosInstance;
