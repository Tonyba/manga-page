import React, { FC } from "react";
import { MoonLoader } from "react-spinners";

type Props = {
  loading: boolean;
  text: string;
  fullWidth?: boolean;
};

const SubmitButton: FC<Props> = ({ loading, text, fullWidth = false }) => {
  return (
    <button
      className={` p-2 button-primary rounded-xl 
  font-semibold mt-3 flex gap-3 items-center justify-center disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : "w-max"}
  `}
      type="submit"
      disabled={loading}
    >
      {text}
      {loading && <MoonLoader color="white" size={18} />}
    </button>
  );
};

export default SubmitButton;
