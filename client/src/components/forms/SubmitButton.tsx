import React, { FC } from "react";
import { MoonLoader } from "react-spinners";

type Props = {
  loading: boolean;
  text: string;
};

const SubmitButton: FC<Props> = ({ loading, text }) => {
  return (
    <button
      className="w-max p-2 button-primary rounded-xl 
  font-semibold mt-3 flex gap-3 items-center disabled:cursor-not-allowed"
      type="submit"
      disabled={loading}
    >
      {text}
      {loading && <MoonLoader color="white" size={18} />}
    </button>
  );
};

export default SubmitButton;
