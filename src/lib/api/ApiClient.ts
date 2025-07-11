import axios from "axios";
import defaultConfig from "./config";
import { storageService } from "../services";

class ApiClient {
  private readonly config;
  private readonly axiosInstance;

  constructor(customConfig = {}) {
    this.config = { ...defaultConfig, ...customConfig };

    this.axiosInstance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: this.config.headers,
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = storageService.getItem(this.config.tokenKey);

        const isExternalRequest = !!config.url?.startsWith(this.config.baseURL);

        if (token && !isExternalRequest) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const { status } = error.response;

          if (status === 401 && this.config.redirectOnUnauthorized) {
            storageService.removeItem(this.config.tokenKey);
            window.location.href = this.config.loginRedirectPath;
          }

          return Promise.reject(error);
        }
      }
    );
  }

  public getAxiosInstance() {
    return this.axiosInstance;
  }
}

export default ApiClient;
