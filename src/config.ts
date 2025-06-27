// list of required environment variable keys
const requiredEnvVars = ["NEXT_PUBLIC_BASE_URL"];

// warn if any required environment variable is missing
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.warn(` ⚠️[ENV WARNING] Missing environment variable: "${key}"`);
  }
});

const config = {
  BASE_URL: String(process.env.NEXT_PUBLIC_BASE_URL),
};

export default config;
