import axios from "./api";

export const getProfile = () => {
  return axios.get("/profile");
};
