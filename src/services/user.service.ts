import axios from "./service";

export const getProfile = () => {
  return axios.get("/profile");
};
