import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const auth = token ? `Bearer ${token}` : "";
      config.headers["authorization"] = auth;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
