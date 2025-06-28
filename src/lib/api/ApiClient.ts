import axios from "axios";
import defaultConfig from "./config";
import storageService from "../services/StorageService";

class ApiClient {
  private readonly config;
  private readonly axiosInstance;

  constructor(customConfig = {}) {
    this.config = { ...defaultConfig, ...customConfig };

    this.axiosInstance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: this.config.headers,
      withCredentials: this.config.withCredentials,
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = storageService.getItem(this.config.tokenKey);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 401 && this.config.redirectOnUnauthorized) {
            storageService.removeItem(this.config.tokenKey);
            window.location.href = this.config.loginRedirectPath;
          }

          // If the error response contains a message, return it
          if (data && typeof data === "object" && data?.message) {
            return Promise.reject(new Error(data?.message));
          }

          // Otherwise, return a generic error
          return Promise.reject(
            new Error("Something went wrong. Please try again.")
          );
        } else if (error.request) {
          // The request was made but no response was received
          return Promise.reject(
            new Error(
              "No response from server. Please check your internet connection."
            )
          );
        } else {
          // Something happened in setting up the request
          return Promise.reject(
            new Error(
              "An unexpected error occurred. Please refresh and try again."
            )
          );
        }
      }
    );
  }

  public getAxiosInstance() {
    return this.axiosInstance;
  }
}

export default ApiClient;
