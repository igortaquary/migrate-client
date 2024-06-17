import axios from "./service";

export const getLodge = (id: string) => {
  return axios.get("/lodge/" + id);
};

export const getUserLodges = () => {
  return axios.get("/lodge/profile");
};

interface CreateLodgeDto {
  title: string;
  description: string;
  type: number;
  space: number;
  institutionId: string;
}

export const createLodge = (payload: CreateLodgeDto) => {
  return axios.post("/lodge", payload);
};
