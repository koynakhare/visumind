// src/api/axiosInstance.ts
import { logout } from "@/component/utils/helper";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import toast from "react-hot-toast";

export const handleErrors = async (error: any, dispatch?: AppDispatch) => {
  if (!error) {
    return Promise.reject("Something went wrong");
  }

  const { response, request, message } = error;

  if (response) {
    const { status, data } = response;
    if (status === 401) {
      toast.error("Session expired. Please login again.");
      await logout();
      return Promise.reject({ data: data ?? { message: "Unauthorized access" } });
    } else if (status === 404) {
      toast.error("Resource not found");
      return Promise.reject({ data: data ?? { message: "Resource not found" } });
    } else if (status === 500) {
      toast.error("Internal server error");
      return Promise.reject({ data: data ?? { message: "Internal server error" } });
    } else if (status === 400) {
      if (data?.error && typeof data.error === "string") {
        toast.error(data.error);
        return Promise.reject({
          data: {
            message: data.error,
            error: true,
          },
        });
      } else if (data?.message && typeof data.message === "string") {
        toast.error(data.message);
        return Promise.reject({ data });
      } else {
        toast.error("Unknown error occurred");
        return Promise.reject({
          data: { message: "Unknown error occurred", error: true },
        });
      }
    } else if (status === 429) {
      toast.error("Daily limit reached. You used all 20 queries for today. Try again in 24 hours");
      return Promise.reject({
        message: data?.error,
        error: true,
      });
    } else {
      toast.error("Server error");
      return Promise.reject({ data: data ?? { message: "Server error" } });
    }
  } else if (request) {
    toast.error("No response from server");
    return Promise.reject({ message: "No response from server" });
  } else {
    toast.error(message || "Unknown error occurred");
    return Promise.reject({ message: message || "Unknown error occurred" });
  }
};

const axiosInstance = axios.create({
  baseURL: "/api/",
});

axiosInstance.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => handleErrors(error)
);

export default axiosInstance;
