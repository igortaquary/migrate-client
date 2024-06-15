import axios from "./service";

export interface ISignIn {
  email: string;
  password: string;
}

export const signIn = (payload: ISignIn) => {
  console.log(payload);
  return axios.post("/auth/login", payload);
};
