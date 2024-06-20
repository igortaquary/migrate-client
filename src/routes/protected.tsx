import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const ProtectedRoute = () => {
  const userContext = useContext(UserContext);
  if (!userContext.loading && !userContext.user) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};
