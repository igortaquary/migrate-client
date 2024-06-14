import { ReactNode } from "react";
import { Header } from "../Header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className='container'>{children}</div>
    </div>
  );
};
