import React, { FC } from "react";
import ValidationError from "./ValidationError";

type Props = {
  type?: string;
  onChange: (val: string) => void;
  label?: string;
  defaulValue?: string;
  value?: string | number;
  placeholder?: string;
  name?: string;
  errMsg?: string;
  focusAnimationsLabel?: boolean;
};

const labelAnimationStyles = {
  animated: `absolute duration-150 transform 
    -translate-y-3
    scale-75
    top-4
    z-10
    origin-[0]
    left-6
    text-zinc-400
    peer-placeholder-shown:scale-100
    peer-placeholder-shown:translate-y-0
    peer-focus:scale-75
    peer-focus:-translate-y-3
    `,
  normal: "mb-2 block",
};

const Input: FC<Props> = ({
  type = "text",
  placeholder,
  onChange,
  name,
  label,
  value,
  errMsg,
  focusAnimationsLabel = false,
}) => {
  return (
    <div className="relative">
      {label && !focusAnimationsLabel && (
        <label className={labelAnimationStyles.normal} htmlFor={name}>
          {label}
        </label>
      )}

      <input
        className={`w-full bg-primary ${
          focusAnimationsLabel ? "px-6 pt-6 pb-1" : "p-3"
        } rounded-md  outline-none peer`}
        type={type}
        id={name}
        name={name}
        value={value}
        min={type === "number" ? 1 : ""}
        placeholder={focusAnimationsLabel && placeholder ? " " : placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      {label && focusAnimationsLabel && (
        <label className={labelAnimationStyles.animated} htmlFor={name}>
          {label}
        </label>
      )}

      {errMsg && <ValidationError errorMessage={errMsg} />}
    </div>
  );
};

export default Input;
