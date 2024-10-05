// src/shared/libs/axiosInterceptor.ts
import { AxiosResponse, AxiosError } from 'axios';
import axiosInstance from './axiosInstance';

interface AxiosErrorResponse {
  data?: any
  status?: number
  headers?: Record<string, any>
}
axiosInstance.interceptors.response.use(
  function (response: AxiosResponse): any {
    return response;
  },
  function (error: AxiosError): any {
    const res: AxiosErrorResponse = {};
    if (error.response !== null && error.response !== undefined) {
      res.data = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers;
    } else if (error.request !== null && error.request !== undefined) {
      console.error(error.request);
    } else if (error.message !== null && error.message !== undefined) {
      console.error('Error', error.message);
    } else {
      console.error('An unknown error occurred.');
    }
    return Promise.reject(res);
  }
);

export default axiosInstance;
