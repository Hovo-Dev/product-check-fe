// Import necessary dependencies and modules
import axios from "axios";
import LocalStorageService from "@/services/localStorage.service.ts";
import { APIPaths } from "@/types/api.ts";

// Function to create an Axios instance with or without a bearer token
const createAxiosInstance = (withAuth = false) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data?.message === "TOKEN_INVALID"
      ) {
        const refreshToken = LocalStorageService.getRefreshToken();
        const { data } = await instance.post(APIPaths.RefreshToken, {
          refreshToken,
        });

        if (data) {
          LocalStorageService.setToken(data.result.token);
          LocalStorageService.setRefreshToken(data.result.refreshToken);

          const originalRequest = error.config;

          return instance(originalRequest);
        }

        LocalStorageService.revokeAllToken();

        return Promise.reject("Refresh Token Failed");
      }

      if (error.code === "ERR_NETWORK") {
        return Promise.reject(error.code);
      }

      if (error.response) {
        const errorMessage = error.response.data.message || error.message;

        return Promise.reject(errorMessage);
      }


      return Promise.reject(error.response.data.message);
    },
  );

  if (withAuth) {
    instance.interceptors.request.use(
      async (config) => {
        const token = LocalStorageService.getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  return instance;
};

// Create Axios instances
const axiosInstance = createAxiosInstance();
const axiosInstanceAuth = createAxiosInstance(true);

export { axiosInstance, axiosInstanceAuth };
