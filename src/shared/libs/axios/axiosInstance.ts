// src/shared/libs/axiosInstance.ts
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../config/environment';
import Cookies from 'js-cookie';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: environment.apiEndpoint
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
