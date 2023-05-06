import React, { FC } from "react";
import ValidationError from "./ValidationError";

type Props = {
  onChange: (val: string) => void;
  label: string;
  defaulValue?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  errMsg?: string;
};

const TextArea: FC<Props> = ({
  label,
  value,
  placeholder,
  name,
  defaulValue,
  onChange,
  errMsg,
}) => {
  return (
    <div>
      <label className="mb-3 block" htmlFor={name}>
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        rows={5}
        className="bg-primary w-full rounded-md text-md outline-none p-3"
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      {errMsg && <ValidationError errorMessage={errMsg} />}
    </div>
  );
};

export default TextArea;
