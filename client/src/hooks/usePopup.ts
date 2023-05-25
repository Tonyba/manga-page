import { Dispatch, SetStateAction, useState } from "react";

export const usePopup = (): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => void
] => {
  const [isOpen, setOpen] = useState(false);

  const onModalClose = () => {
    setOpen(false);
  };

  return [isOpen, setOpen, onModalClose];
};
