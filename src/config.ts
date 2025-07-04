import LoggerService from "./lib/services/LoggerService";

const logger = new LoggerService("Config");

// list of required environment variable keys
const requiredEnvVars = [
  "NEXT_PUBLIC_BASE_URL",
  "NEXT_PUBLIC_GEOAPIFY_API_KEY",
];

// warn if any required environment variable is missing
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    logger.warn(`⚠️ Missing environment variable: "${key}"`);
  }
});

const config = {
  BASE_URL: String(process.env.NEXT_PUBLIC_BASE_URL),
  GEOAPIFY_API_KEY: String(process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY),
};

export default config;
