import { Header } from "../Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className='bg-light' style={{ minHeight: "100vh" }}>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
};
