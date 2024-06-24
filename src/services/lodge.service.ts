import { Location } from "../types/location.types";
import { Lodge } from "../types/lodge.types";
import { PhotoToUpload } from "../types/photo.type";
import api from "./api";

export const getLodge = (id: string) => {
  return api.get("/lodge/" + id);
};

export const getUserLodges = () => {
  return api.get("/lodge/profile");
};

export interface CreateLodgeDto
  extends Omit<Lodge, "id" | "distanceFromInstitution" | "photos"> {
  photos: PhotoToUpload[];
  institutionId: string | null;
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

export const searchLodges = (params: any) => {
  return api.get("/lodge", { params });
};

export const getLodgeContactInfo = (id: string) => {
  return api.get("/lodge/" + id + "/contact");
};
