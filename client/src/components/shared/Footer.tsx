import { useRouter } from "next/router";
import React from "react";

const Footer = () => {
  const router = useRouter();

  if (router.asPath.includes("dashboard")) return;

  return <footer className="text-white col-span-4 ">Footer</footer>;
};

export default Footer;
