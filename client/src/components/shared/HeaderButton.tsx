import Link from "next/link";
import React, { FC, useRef } from "react";

type Props = {
  icon: React.ReactNode;
  link?: string;
  onClick?: () => void;
  primary?: boolean;
};

const HeaderButton: FC<Props> = ({ icon, onClick, link, primary = false }) => {
  let buttonStyles = useRef(
    "h-12 w-12  cursor-pointer rounded-full bg-primary-dark-hover flex items-center justify-center "
  );

  switch (primary) {
    case true:
      buttonStyles.current += "bg-primary ";
      break;

    case false:
      buttonStyles.current += "bg-primary-dark ";
      break;
  }

  return link ? (
    <Link href={link} className={buttonStyles.current}></Link>
  ) : (
    <button onClick={onClick} className={buttonStyles.current}>
      {icon}
    </button>
  );
};

export default HeaderButton;
