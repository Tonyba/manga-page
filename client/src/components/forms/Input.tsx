import React, { FC } from "react";

type Props = {
  defaulValue?: string;
  value?: string;
  type?: string;
  placeholder?: string;
};

const Input: FC<Props> = ({
  type = "text",
  placeholder,
  value,
  defaulValue,
}) => {
  return (
    <input
      className="w-full rounded-lg bg-primary outline-none py-2 px-3"
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
