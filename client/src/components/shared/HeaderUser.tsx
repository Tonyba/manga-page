import React, { useState } from "react";

import { FaUserAlt } from "react-icons/fa";
import Popup from "./Popup";
import LoginRegisterFormModal from "./LoginRegisterFormModal";
import { useAppContext } from "@/utils/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import UserDropdown from "./UserDropdown";

const buttonStyles = `h-12 
w-12  
cursor-pointer 
bg-primary-dark rounded-full bg-primary-dark-hover flex
items-center justify-center`;

const HeaderUser = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAppContext();
  const { setToken } = useAuth();

  const iconLink =
    user?.role === "Admin" ? "/dashboard" : "/dashboard/settings";

  const handleOpen = () => {
    setOpen(false);
  };

  console.log(user);

  return (
    <>
      <div className="relative group">
        {user ? (
          <>
            <Link role="button" className={buttonStyles} href={iconLink}>
              <FaUserAlt size={16} />
            </Link>
            <UserDropdown />
          </>
        ) : (
          <button onClick={() => setOpen(true)} className={buttonStyles}>
            <FaUserAlt size={16} />
          </button>
        )}
      </div>

      <Popup
        onModalClose={handleOpen}
        isOpen={open}
        className="bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center"
      >
        <LoginRegisterFormModal
          closeModal={() => setOpen(false)}
          setToken={setToken}
        />
      </Popup>
    </>
  );
};

export default HeaderUser;
