import { useRouter } from "next/router";
import React from "react";

const Footer = () => {
  const router = useRouter();
  const isDashboard = router.asPath.includes("dashboard");

  return isDashboard ? (
    <></>
  ) : (
    <footer className="text-white col-span-4 ">Footer</footer>
  );
};

export default Footer;
