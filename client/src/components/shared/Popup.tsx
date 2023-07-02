import React, { FC, PropsWithChildren } from "react";
import { FaTimes } from 'react-icons/fa';

type Props = {
  className?: string;
  isOpen: boolean;
  onModalClose: () => void;
  showCloseBtn?: boolean;
};

const Popup: FC<PropsWithChildren & Props> = ({
  children,
  className,
  isOpen = false,
  onModalClose,
  showCloseBtn = false
}) => {
  const handleOnModalClose = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.id === "modal") onModalClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal"
      onClick={handleOnModalClose}
      role="dialog"
      className={`fixed inset-0 flex ${className} z-50`}
    >
        { showCloseBtn 
        ?  <div className='relative'>
            <button className="bg-primary border-primary-dark border absolute -right-2 -top-2 bg-primary-hover bg-hover p-1 rounded-full" onClick={onModalClose}><FaTimes size={22} /></button>
            {children}
          </div>
        : children}
    </div>
  );
};

export default Popup;
