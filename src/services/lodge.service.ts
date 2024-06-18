import { Location } from "../types/location.types";
import api from "./api";

export const getLodge = (id: string) => {
  return api.get("/lodge/" + id);
};

export const getUserLodges = () => {
  return api.get("/lodge/profile");
};

export interface CreateLodgeDto {
  title: string;
  description: string;
  type: number;
  space: number;
  institutionId: string;
  location: Location;
}

export const createLodge = (payload: CreateLodgeDto) => {
  return api.post("/lodge", payload);
};

export const updateLodge = (id: string, payload: CreateLodgeDto) => {
  return api.patch("/lodge/" + id, payload);
};

export const deleteLodge = (id: string) => {
  return api.delete("/lodge/" + id);
};
