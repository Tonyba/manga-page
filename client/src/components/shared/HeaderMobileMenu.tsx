import React from "react";

import { FaBars, FaTimes } from "react-icons/fa";
import HeaderButton from "./HeaderButton";
import Popup from "./Popup";
import { usePopup } from "@/hooks/usePopup";
import SlideContainer from "./SlideContainer";
import Logo from "./Logo";
import {
  HEADER_MENU_ITEMS,
  HEADER_SOCIAL_ITEMS,
  USER_LOGGED_MENU_ITEMS,
} from "@/utils/constants";
import Link from "next/link";
import { useAppContext } from "@/utils/context/AppContext";
import { useAuth } from "@/hooks/useAuth";

const HeaderMobileMenu = () => {
  const [isOpen, setOpen, onModalClose] = usePopup();
  const { user } = useAppContext();
  const { closeSession } = useAuth();

  const loggedUserOpts = USER_LOGGED_MENU_ITEMS.filter((item) => {
    if (item.auth === "Admin" && user?.role !== "Admin") {
      return;
    }
    return item;
  });

  return (
    <>
      <div className="xl:hidden">
        <HeaderButton icon=<FaBars size={16} onClick={() => setOpen(true)} /> />
      </div>

      <Popup isOpen={isOpen} onModalClose={onModalClose} className="w-11/12">
        <SlideContainer
          direction="left"
          className="bg-primary-dark w-11/12 p-5 relative"
        >
          <div className="absolute right-5 top-5">
            <HeaderButton
              icon={<FaTimes size={16} />}
              primary={true}
              onClick={() => setOpen(false)}
            />
          </div>
          <Logo />
          <nav className="mt-5 flex flex-col h-full ">
            <div className="flex flex-col gap-3 ">
              {HEADER_MENU_ITEMS.map((item) => (
                <Link key={item.label} href={item.link} onClick={onModalClose}>
                  {item.label}
                </Link>
              ))}

              {user && (
                <>
                  <hr className="border-primary " />
                  {loggedUserOpts.map((item) => {
                    if (item.role === "link") {
                      return (
                        <Link
                          className="flex gap-3 items-center"
                          key={item.label}
                          href={item.link!}
                          onClick={onModalClose}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      );
                    } else {
                      return (
                        <button
                          key={item.label}
                          className="text-left flex gap-3 items-center"
                          onClick={closeSession}
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      );
                    }
                  })}
                </>
              )}
            </div>

            <hr className="border-primary my-3" />
            <div className="mb-10">
              <span className="text-lg font-semibold mb-3 block">
                Siguenos en
              </span>
              <div className="flex gap-3 flex-wrap ">
                {HEADER_SOCIAL_ITEMS.map((social, index) => (
                  <HeaderButton
                    key={index}
                    link={social.link}
                    icon={social.icon}
                    primary={true}
                  />
                ))}
              </div>
            </div>
          </nav>
        </SlideContainer>
      </Popup>
    </>
  );
};

export default HeaderMobileMenu;
