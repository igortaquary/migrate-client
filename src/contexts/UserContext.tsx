import { createContext, ReactNode, useEffect, useState } from "react";
import { ISignIn, signIn } from "../services/auth.service";

type User = {
  id: string;
  email: string;
  name: string;
};

interface IUserContext {
  login: (payload: ISignIn, onError?: Function) => Promise<void>;
  user: User | undefined;
}

const defaultValues: IUserContext = {
  login: async (payload, onError) => {},
  user: undefined,
};

export const UserContext = createContext(defaultValues);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();

  const login = async (payload: ISignIn, onError?: Function) => {
    try {
      console.log("login");

      const response = await signIn(payload);
      console.log(response);

      const access_token = response.data?.access_token;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        const data = decodeToken(access_token);
        setUser(data);
      }
    } catch (err) {
      if (onError) onError();
    }
  };

  const verifyLoggedIn = () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const data = decodeToken(access_token);
      // Verificar se o token esta valido!!
      if (data?.id && data.email && data.name) {
        setUser({
          id: data.id,
          email: data.email,
          name: data.name,
        });
      }
    }
  };

  const decodeToken = (token: string) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    console.log(jsonPayload);

    return JSON.parse(jsonPayload);
  };

  useEffect(verifyLoggedIn, []);

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};
