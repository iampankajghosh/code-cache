import config from "@/src/config";

// default config for axios
const defaultConfig = {
  baseURL: `${config.BASE_URL}/api/v1`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  tokenKey: "access_token",
  redirectOnUnauthorized: true,
  loginRedirectPath: "/login",
};

export default defaultConfig;
