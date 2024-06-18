import { AxiosError } from "axios";
import api from "./api";

export interface ISignIn {
  email: string;
  password: string;
}

export const signIn = (payload: ISignIn) => {
  return api.post("/auth/login", payload);
};

export interface ISignUp {
  email: string;
  password: string;
  name: string;
  phone: string;
  gender: string;
}

export const signUp = async (payload: ISignUp) => {
  try {
    return await api.post("/auth/sign-up", payload);
  } catch (err) {
    const error = err as AxiosError;
    throw error.response?.data;
  }
};
