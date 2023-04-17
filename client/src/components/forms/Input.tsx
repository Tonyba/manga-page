import React, { FC } from "react";

type Props = {
  type?: string;
  onChange: (val: string) => void;
  label: string;
  defaulValue?: string;
  value?: string;
  placeholder?: string;
  name?: string;
};

const Input: FC<Props> = ({
  type = "text",
  placeholder,
  onChange,
  name,
  label,
  value,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className="w-full bg-primary p-3 rounded-md text-sm outline-none"
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
