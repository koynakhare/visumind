// src/api/axiosInstance.ts
import axios from 'axios';
import { getItemFromLocalStorage, logoutUser, showAlert } from '@/utils/helper'; // Adjust import paths
import { store } from '@/redux/store'; // Access Redux store to dispatch

const axiosInstance = axios.create({
  // baseURL can be set if you want
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItemFromLocalStorage('token');
    const permissionToken = getItemFromLocalStorage('permissionTokenID', '');
    if (token) {
      config.headers = {
        ...config.headers,
        authorization: token,
        Permissions: permissionToken,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      showAlert(store.dispatch, false, 'Unauthorized access', true);
      await logoutUser(store.dispatch);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
