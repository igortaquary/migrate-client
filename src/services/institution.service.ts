import api from "./api";

export const getAllInstitutions = () => {
  return api.get("/institution");
};
