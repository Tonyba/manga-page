import React, { FC } from "react";
import ValidationError from "./ValidationError";

type Props = {
  type?: string;
  onChange: (val: string) => void;
  label: string;
  defaulValue?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  errMsg?: string;
};

const Input: FC<Props> = ({
  type = "text",
  placeholder,
  onChange,
  name,
  label,
  value,
  errMsg,
}) => {
  return (
    <div>
      <label className="mb-2 block" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full bg-primary p-3 rounded-md text-sm outline-none"
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {errMsg && <ValidationError errorMessage={errMsg} />}
    </div>
  );
};

export default Input;
