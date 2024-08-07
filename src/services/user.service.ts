import { User } from "../types/user.types";
import axios from "./api";

export const getProfile = () => {
  return axios.get("/profile");
};

export const updateProfile = (payload: User) => {
  return axios.patch("/profile", payload);
};
