import React, { FC, PropsWithChildren } from "react";

type Props = {
  className?: string;
  isOpen: boolean;
  isAbsolute?: boolean;
  onModalClose: () => void;
};

const Popup: FC<PropsWithChildren & Props> = ({
  children,
  className,
  isOpen = false,
  onModalClose,
  isAbsolute = false,
}) => {
  const handleOnModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.id === "modal") onModalClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal"
      onClick={handleOnModalClose}
      role="dialog"
      className={`fixed inset-0 flex ${className}`}
    >
      {children}
    </div>
  );
};

export default Popup;