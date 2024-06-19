import axios from "axios";
import showNotification from "../components/GlobalAlert";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("interceptors error");
    if (error.response.status === 401) {
      showNotification("danger", "Usuário não autorizado");
      window.location.href = "/login";
    }
    throw error;
  }
);

export default api;
