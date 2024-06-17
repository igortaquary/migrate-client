import { createContext, ReactNode, useEffect, useState } from "react";
import * as authService from "../services/auth.service";

type User = {
  id: string;
  email: string;
  name: string;
};

interface IUserContext {
  login: (payload: authService.ISignIn, onError?: Function) => Promise<void>;
  signUp: (
    payload: authService.ISignUp,
    onSuccess?: Function,
    onError?: Function
  ) => Promise<void>;
  logout: () => void;
  user: User | undefined;
}

const ACCESS_TOKEN = "access_token";

const defaultValues: IUserContext = {
  login: async (payload, onError) => {},
  signUp: async (payload, onError) => {},
  logout: () => {},
  user: undefined,
};

export const UserContext = createContext(defaultValues);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();

  const login = async (payload: authService.ISignIn, onError?: Function) => {
    try {
      const response = await authService.signIn(payload);

      const access_token = response.data?.access_token;
      if (access_token) {
        localStorage.setItem(ACCESS_TOKEN, access_token);
        const data = decodeToken(access_token);
        setUser({
          email: data.email,
          id: data.id,
          name: data.name,
        });
      }
    } catch (err) {
      if (onError) onError();
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setUser(undefined);
  };

  const signUp = async (
    payload: authService.ISignUp,
    onSuccess?: Function,
    onError?: Function
  ) => {
    try {
      await authService.signUp(payload);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.log(err);

      if (onError) onError(err);
    }
  };

  const verifyLoggedIn = () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN);
    if (access_token) {
      const data = decodeToken(access_token);
      if (data) {
        const notExpired = Date.now() < data.exp * 1000;
        if (notExpired) {
          setUser({
            id: data.id,
            email: data.email,
            name: data.name,
          });
        } else {
          localStorage.removeItem(ACCESS_TOKEN);
        }
      }
    }
  };

  const decodeToken = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  useEffect(verifyLoggedIn, []);

  return (
    <UserContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </UserContext.Provider>
  );
};
