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
      <div className="h-full mx-auto xl:px-30 ">
        <div className="grid grid-cols-4">
          <Header />
          <div className="col-span-4 row-span-4 lg:col-span-4 xl:px-5 2xl:px-0">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
