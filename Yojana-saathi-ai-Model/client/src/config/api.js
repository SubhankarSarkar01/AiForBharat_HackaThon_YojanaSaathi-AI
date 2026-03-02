const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const resolveApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;

  if (!envUrl) {
    return "http://localhost:5000/api";
  }

  const normalized = trimTrailingSlash(envUrl.trim());
  return normalized.endsWith("/api") ? normalized : `${normalized}/api`;
};

export const API_URL = resolveApiUrl();
