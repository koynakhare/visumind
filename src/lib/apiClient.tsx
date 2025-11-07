// src/api/apiClient.ts
import axiosInstance from './axios';
import { getSession } from 'next-auth/react';

export interface RequestOptions {
  contentType?: 'json' | 'formdata';
  auth?: boolean; // new flag to include auth header
}

const getHeaders = async (options?: RequestOptions) => {
  const headers: Record<string, string> = {
    'Content-Type':
      options?.contentType === 'formdata'
        ? 'multipart/form-data'
        : 'application/json',
  };

  if (options?.auth) {
    const session = await getSession();
    const accessToken = session?.accessToken;
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  return headers;
};

// Helper to merge headers correctly with axios
const withHeaders = async (callback: (headers: any) => Promise<any>, options?: RequestOptions) => {
  const headers = await getHeaders(options);
  return callback(headers);
};

export const getRequest = (url: string, options?: RequestOptions) =>
  withHeaders(headers => axiosInstance.get(url, { headers }), options);

export const postRequest = (url: string, data?: any, options?: RequestOptions) =>
  withHeaders(headers => axiosInstance.post(url, data, { headers }), options);

export const patchRequest = (url: string, data?: any, options?: RequestOptions) =>
  withHeaders(headers => axiosInstance.patch(url, data, { headers }), options);

export const putRequest = (url: string, data?: any, options?: RequestOptions) =>
  withHeaders(headers => axiosInstance.put(url, data, { headers }), options);

export const deleteRequest = (url: string, data?: any, options?: RequestOptions) =>
  withHeaders(headers => axiosInstance.delete(url, { headers, data }), options);
