// src/api/apiClient.ts
import axiosInstance from './axiosInstance';

export interface RequestOptions {
  contentType?: 'json' | 'formdata';
}

const getHeaders = (contentType?: 'json' | 'formdata') => {
  if (contentType === 'formdata') {
    return { 'Content-Type': 'multipart/form-data' };
  }
  return { 'Content-Type': 'application/json' };
};

export const getRequest = (url: string, options?: RequestOptions) => {
  return axiosInstance.get(url, { headers: getHeaders(options?.contentType) });
};

export const postRequest = (url: string, data?: any, options?: RequestOptions) => {
  return axiosInstance.post(url, data, { headers: getHeaders(options?.contentType) });
};

export const patchRequest = (url: string, data?: any, options?: RequestOptions) => {
  return axiosInstance.patch(url, data, { headers: getHeaders(options?.contentType) });
};

export const putRequest = (url: string, data?: any, options?: RequestOptions) => {
  return axiosInstance.put(url, data, { headers: getHeaders(options?.contentType) });
};

export const deleteRequest = (url: string, data?: any, options?: RequestOptions) => {
  return axiosInstance.delete(url, { headers: getHeaders(options?.contentType), data });
};
