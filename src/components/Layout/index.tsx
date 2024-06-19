import { Footer } from "../Footer";
import { Header } from "../Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className='bg-light d-flex flex-column' style={{ minHeight: "100vh" }}>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
