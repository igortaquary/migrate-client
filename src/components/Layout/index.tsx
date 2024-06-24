import { Footer } from "../Footer";
import { Header } from "../Header";
import { Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();

  const noContainerPaths = ["/"];
  let container = true;

  if (noContainerPaths.includes(location.pathname)) container = false;

  return (
    <div className='bg-light d-flex flex-column' style={{ minHeight: "100vh" }}>
      <Header />
      <div className={container ? "container" : ""}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
