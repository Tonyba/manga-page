import React, { FC, useState } from "react";
import Popup from "../shared/Popup";
import AddChapterForm from "../forms/AddChapterForm";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
};

const DashboardAddChapterModal: FC<Props> = ({
  isOpen = false,
  onModalClose,
}) => {
  return (
    <motion.div
      animate={{
        top: isOpen ? 0 : "100%",
        display: isOpen ? "block" : "none",
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
      }}
      className="w-full bg-primary-dark rounded-md p-5 min-h-full absolute top-0 left-0"
    >
      <div className="flex justify-end">
        <button
          className="bg-primary p-3 rounded-full bg-hover"
          onClick={onModalClose}
        >
          <FaTimes size={20} />
        </button>
      </div>

      <div className="">
        <h2 className="text-xl font-semibold">
          Agrega las imagenes del capitulo
        </h2>

        <AddChapterForm />
      </div>
    </motion.div>
  );
};

export default DashboardAddChapterModal;
