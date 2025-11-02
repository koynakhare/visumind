// src/api/axiosInstance.ts
import { logout } from '@/component/utils/helper';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: '/api/',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      toast.error('Session Expired Please Login Again');
      await logout();
      window.location.href = '/pages/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
