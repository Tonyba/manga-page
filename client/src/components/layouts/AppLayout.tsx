import { FC, ReactNode } from "react";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";

type Props = {
  children: ReactNode;
  className: string;
};

const AppLayout: FC<Props> = ({ children, className }) => {
  return (
    <div className={`h-screen bg-body ${className}`}>
      <div className="container h-full mx-auto xl:px-30 max-w-7xl">
        <div className="grid grid-cols-4 grid-rows-6 h-full">
          <Header />
          <div className="col-span-4 row-span-4 lg:col-span-4">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
