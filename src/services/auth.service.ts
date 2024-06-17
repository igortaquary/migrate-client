import { AxiosError } from "axios";
import axios from "./service";

export interface ISignIn {
  email: string;
  password: string;
}

export const signIn = (payload: ISignIn) => {
  return axios.post("/auth/login", payload);
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
    return await axios.post("/auth/sign-up", payload);
  } catch (err) {
    const error = err as AxiosError;
    throw error.response?.data;
  }
};
