import { FC, ReactNode } from "react";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

type Props = {
  children: ReactNode;
  className: string;
};

const AppLayout: FC<Props> = ({ children, className }) => {
  return (
    <div className={`h-screen bg-body ${className}`}>
      <div className="container h-full mx-auto xl:px-30 max-w-7xl">
        <div className="grid grid-cols-4 px-5 xl:px-0">
          <Header />
          <div className="col-span-4 row-span-4 lg:col-span-4">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
